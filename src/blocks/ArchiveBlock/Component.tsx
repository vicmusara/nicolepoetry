import type { ArchiveBlock as ArchiveBlockProps, Story } from '@/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import RichText from '@/components/RichText'

import { CollectionArchive } from '@/components/CollectionArchive'
import { CardStoryData } from '@/components/Card'

// Helper function to populate authors manually
const populateAuthorsForStories = (stories: any[]): any[] => {
  return stories.map((story) => {
    if (story.authors && story.authors.length > 0) {
      const populatedAuthors: { id: string; name: string; avatar?: string | any }[] = []

      for (const author of story.authors) {
        try {
          if (typeof author === 'object' && author !== null) {
            const authorValue = author.value

            // Check if it's a populated object or just an ID
            if (typeof authorValue === 'object' && authorValue !== null && authorValue.id) {
              // It's a populated object
              if (authorValue.name) {
                populatedAuthors.push({
                  id: authorValue.id,
                  name: authorValue.name,
                  avatar: authorValue.avatar, // Pass the full avatar object instead of just the URL
                })
              }
            } else if (typeof authorValue === 'string') {
              // It's just an ID - we can't fetch here in the frontend
              // This will be handled by the populateAuthors hook on the backend
            }
          }
        } catch (error) {
          console.error('Error processing author:', error)
        }
      }

      if (populatedAuthors.length > 0) {
        return {
          ...story,
          populatedAuthors,
        }
      }
    }

    return story
  })
}

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
    id?: string
  }
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let stories: any[] = []

  if (populateBy === 'collection') {
    const payload = await getPayload({ config: configPromise })

    const flattenedCategories = categories?.map((category) => {
      if (typeof category === 'object') return category.id
      else return category
    })

    const fetchedStories = await payload.find({
      collection: 'stories',
      depth: 1,
      limit,
      overrideAccess: true, // Bypass access control to get author data
      select: {
        title: true,
        slug: true,
        categories: true,
        populatedAuthors: true, // Use populatedAuthors from backend hook
        meta: {
          image: true,
          description: true,
        },
        createdAt: true,
        authors: true, // Include authors to populate manually
      },
      ...(flattenedCategories && flattenedCategories.length > 0
        ? {
            where: {
              categories: {
                in: flattenedCategories,
              },
            },
          }
        : {}),
    })

    stories = populateAuthorsForStories(fetchedStories.docs)
  } else {
    if (selectedDocs?.length) {
      stories = selectedDocs.map((story) => {
        if (typeof story.value === 'object') return story.value
      }) as any[]
      stories = populateAuthorsForStories(stories)
    }
  }

  return (
    <div className="my-16" id={`block-${id}`}>
      {introContent && (
        <div className="container mb-16">
          <RichText className="ms-0 max-w-[48rem]" data={introContent} enableGutter={false} />
        </div>
      )}
      <CollectionArchive stories={stories} />
    </div>
  )
}
