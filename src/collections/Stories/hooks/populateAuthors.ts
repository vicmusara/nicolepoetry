import type { CollectionAfterReadHook } from 'payload'
import { User, Writer } from '@/payload-types'

// The `user` collection has access control locked so that users are not publicly accessible
// This means that we need to populate the authors manually here to protect user privacy
// GraphQL will not return mutated user data that differs from the underlying schema
// So we use an alternative `populatedAuthors` field to populate the user data, hidden from the admin UI
export const populateAuthors: CollectionAfterReadHook = async ({ doc, req: { payload } }) => {
  if (doc?.authors && doc?.authors?.length > 0) {
    const populatedAuthors: { id: string; name: string; avatar?: string }[] = []

    for (const author of doc.authors) {
      try {
        let authorData: User | Writer | null = null

        // Check if author.value is a populated object or just an ID
        if (typeof author === 'object' && author !== null) {
          const authorValue = author.value

          if (typeof authorValue === 'object' && authorValue !== null && authorValue.id) {
            // It's a populated object
            if (authorValue.name) {
              const avatarUrl =
                authorValue.avatar && typeof authorValue.avatar === 'object'
                  ? authorValue.avatar.url
                  : undefined

              populatedAuthors.push({
                id: authorValue.id,
                name: authorValue.name,
                avatar: avatarUrl,
              })
              continue
            }
          } else if (typeof authorValue === 'string') {
            // It's just an ID, we need to fetch the author data
            const authorId = authorValue
            const relationTo = author.relationTo

            if (relationTo === 'users') {
              authorData = await payload.findByID({
                collection: 'users',
                id: authorId,
                depth: 1, // Populate the avatar relationship
                overrideAccess: true, // Bypass access control
              })
            } else if (relationTo === 'writers') {
              authorData = await payload.findByID({
                collection: 'writers',
                id: authorId,
                depth: 1, // Populate the avatar relationship
                overrideAccess: true, // Bypass access control
              })
            }

            if (authorData && authorData.name) {
              const avatarUrl =
                authorData.avatar && typeof authorData.avatar === 'object'
                  ? authorData.avatar.url || undefined
                  : undefined

              populatedAuthors.push({
                id: authorData.id,
                name: authorData.name,
                avatar: avatarUrl,
              })
            }
          }
        }
      } catch (error) {
        console.error('Error processing author:', error)
      }
    }

    if (populatedAuthors.length > 0) {
      doc.populatedAuthors = populatedAuthors
    }
  }

  return doc
}
