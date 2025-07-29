import type { Metadata } from 'next/types'

import { CollectionArchive } from '@/components/CollectionArchive'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import configPromise from '@payload-config'
import { getPayload } from 'payload'
import React from 'react'
import PageClient from './page.client'
import { notFound } from 'next/navigation'
import { CardStoryData } from '@/components/Card'

export const revalidate = 600

// Helper function to populate authors manually
const populateAuthorsForStories = (stories: CardStoryData[]): CardStoryData[] => {
  return stories.map((story) => {
    if (story.authors && story.authors.length > 0) {
      const populatedAuthors: { id: string; name: string; avatar?: string }[] = []

      for (const author of story.authors) {
        try {
          if (typeof author === 'object' && author !== null) {
            const authorValue = author.value

            // Check if it's a populated object or just an ID
            if (typeof authorValue === 'object' && authorValue !== null && authorValue.id) {
              // It's a populated object
              if (authorValue.name) {
                const avatarUrl =
                  authorValue.avatar && typeof authorValue.avatar === 'object'
                    ? authorValue.avatar.url || undefined
                    : undefined

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

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const stories = await payload.find({
    collection: 'stories',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: true, // Bypass access control to get author data
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
  const storiesWithAuthors = populateAuthorsForStories(stories.docs)

  return (
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Stories</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange
          collection="stories"
          currentPage={stories.page}
          limit={12}
          totalDocs={stories.totalDocs}
        />
      </div>

      <CollectionArchive stories={storiesWithAuthors} />

      <div className="container">
        {stories?.page && stories?.totalPages > 1 && (
          <Pagination page={stories.page} totalPages={stories.totalPages} />
        )}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Stories Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'stories',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
