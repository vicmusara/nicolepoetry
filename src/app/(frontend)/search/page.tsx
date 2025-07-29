import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import { Search } from '@/search/Component'
import PageClient from './page.client'
import { CardStoryData } from '@/components/Card'
import Heading from '@/components/ui/heading'

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

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
export default async function Page({ searchParams: searchParamsPromise }: Args) {

  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })
  const stories = await payload.find({
    collection: 'search',
    depth: 1,
    limit: 12,
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
    },
    // pagination: false reduces overhead if you don't need totalDocs
    pagination: true,
    ...(query
      ? {
          where: {
            or: [
              {
                title: {
                  like: query,
                },
              },
              {
                'meta.description': {
                  like: query,
                },
              },
              {
                'meta.title': {
                  like: query,
                },
              },
              {
                slug: {
                  like: query,
                },
              },
            ],
          },
        }
      : {}),
  })
  console.log(stories.docs)
  const storiesWithAuthors = populateAuthorsForStories(stories.docs as StoryWithPopulatedAuthors[])
  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <Heading subtitle="Search for stories, poems, and more"/>

          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {stories.totalDocs > 0 ? (
        <CollectionArchive stories={storiesWithAuthors as unknown as CardStoryData[]} />
      ) : (
        <div className="container">No results found.</div>
      )}
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `@nicolepoetry Search`,
  }
}
