import type { CollectionAfterChangeHook, CollectionAfterDeleteHook } from 'payload'

import { revalidatePath, revalidateTag } from 'next/cache'

import type { Story } from '@/payload-types'

export const revalidatePost: CollectionAfterChangeHook<Story> = ({
  doc,
  previousDoc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    if (doc._status === 'published') {
      const path = `/stories/${doc.slug}`

      payload.logger.info(`Revalidating story at path: ${path}`)

      revalidatePath(path)
      revalidateTag('stories-sitemap')
    }

    // If the post was previously published, we need to revalidate the old path
    if (previousDoc._status === 'published' && doc._status !== 'published') {
      const oldPath = `/stories/${previousDoc.slug}`

      payload.logger.info(`Revalidating old story at path: ${oldPath}`)

      revalidatePath(oldPath)
      revalidateTag('stories-sitemap')
    }
  }
  return doc
}

export const revalidateDelete: CollectionAfterDeleteHook<Story> = ({ doc, req: { context } }) => {
  if (!context.disableRevalidate) {
    const path = `/stories/${doc?.slug}`

    revalidatePath(path)
    revalidateTag('stories-sitemap')
  }

  return doc
}
