import type { Metadata } from 'next/types'
import React from 'react'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import PageClient from './page.client'
import Heading from '@/components/ui/heading'
import { CardStoryData } from '@/components/Card'

export const dynamic = 'force-static'
export const revalidate = 600

// Type for stories with populated authors
type StoryWithPopulatedAuthors = {
  id: string
  title: string
  slug: string
  categories?: unknown
  meta?: unknown
  createdAt: string
  authors?: Array<{ value: { id: string; name: string; avatar?: unknown } }>
  populatedAuthors?: {
    id: string
    name: string
    avatar?: unknown
  }[]
}

// Helper function to populate authors manually
const populateAuthorsForStories = (
  stories: StoryWithPopulatedAuthors[],
): StoryWithPopulatedAuthors[] => {
  return stories.map((story) => {
    if (story.authors && Array.isArray(story.authors) && story.authors.length > 0) {
      const populatedAuthors: { id: string; name: string; avatar?: unknown }[] = []

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

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const stories = await payload.find({
    collection: 'stories',
    depth: 2, // ensure authors and media are fully populated
    limit: 12,
    overrideAccess: true, // Bypass access control to get author data
    sort: '-createdAt',
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      createdAt: true,
      authors: true, // Include authors to populate manually
    },
  })

  // Manually populate authors
  const storiesWithAuthors = populateAuthorsForStories(stories.docs as StoryWithPopulatedAuthors[])

  return (
    <div className="flex flex-col items-center px-6 sm:px-10 justify-center">
      <div className="pt-24 pb-24 max-w-7xl w-full">
        <PageClient />

        {/* Heading */}
        <div className="container mb-16 text-center">
          <Heading subtitle="Stories" />
        </div>

        {/* Page range info */}
        <div className="container mb-8">
          <PageRange
            collection="stories"
            currentPage={stories.page}
            limit={12}
            totalDocs={stories.totalDocs}
          />
        </div>

        {/* Archive */}
        <CollectionArchive stories={storiesWithAuthors as unknown as CardStoryData[]} />

        {/* Pagination */}
        {stories.totalPages > 1 && stories.page && (
          <div className="container mt-12">
            <Pagination page={stories.page} totalPages={stories.totalPages} />
          </div>
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: 'Stories',
  }
}
