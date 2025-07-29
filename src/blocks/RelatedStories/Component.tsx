import clsx from 'clsx'
import React from 'react'

import type { Story } from '@/payload-types'

import { Card } from '@/components/Card'
import { SerializedEditorState } from '@payloadcms/richtext-lexical/lexical'
import Heading from '@/components/ui/heading'
import { CardStoryData } from '@/components/Card'

export type RelatedStoriesProps = {
  className?: string
  docs?: Story[]
  introContent?: SerializedEditorState
}

function populateAuthorsForRelated(stories: Story[] = []): CardStoryData[] {
  return stories.map((story) => {
    const populatedAuthors = Array.isArray(story.authors)
      ? story.authors
        .map((author) => {
          // Handle the polymorphic relationship structure
          if (typeof author === 'object' && author?.value && typeof author.value === 'object') {
            const authorValue = author.value
            return {
              id: authorValue.id ?? null,
              name: authorValue.name ?? null,
              avatar: authorValue.avatar ?? null,
            }
          }
          return null
        })
        .filter((author): author is NonNullable<typeof author> => author !== null)
      : null

    // Create the base object from Story using Pick
    const baseStoryData: Pick<Story, 'slug' | 'categories' | 'meta' | 'title' | 'createdAt' | 'populatedAuthors'> = {
      slug: story.slug,
      categories: story.categories,
      meta: story.meta,
      title: story.title,
      createdAt: story.createdAt,
      populatedAuthors: story.populatedAuthors, // Keep original if exists
    }

    // Return the intersection type
    return {
      ...baseStoryData,
      authors: story.authors,
      populatedAuthors: populatedAuthors && populatedAuthors.length > 0 ? populatedAuthors : null,
    }
  })
}

export const RelatedStories: React.FC<RelatedStoriesProps> = (props) => {
  const { className, docs } = props

  return (
    <div className={clsx('lg:container mt-24', className)}>
      <div className="max-w-3xl mx-auto px-4 md:px-6">
        <Heading subtitle="Related Stories" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-0 m-0 max-w-4xl mx-auto md:gap-6 items-stretch">
        {populateAuthorsForRelated(docs).map((story) => (
          <Card key={story.slug} doc={story} variant="compact" />
        ))}
      </div>
    </div>
  )
}