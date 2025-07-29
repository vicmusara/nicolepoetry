import { formatDateTime } from 'src/utilities/formatDateTime'
import React from 'react'

import type { Story } from '@/payload-types'

import { Media } from '@/components/Media'
import { formatAuthors } from '@/utilities/formatAuthors'
import { Badge } from '@/components/ui/badge'

export const StoryHero: React.FC<{
  story: Story
}> = ({ story }) => {
  const { categories, heroImage, populatedAuthors, publishedAt, title } = story

  const hasAuthors =
    populatedAuthors && populatedAuthors.length > 0 && formatAuthors(populatedAuthors) !== ''

  return (
    <div className="relative -mt-[10.4rem] flex items-end">
      <div className="container z-10 relative lg:grid lg:grid-cols-[1fr_48rem_1fr] text-muted-foreground pb-8">
        <div className="col-start-1 col-span-1 md:col-start-2 md:col-span-2">
          <div className="flex flex-wrap gap-2 mb-6">
            {categories?.map((category, index) => {
              if (typeof category === 'object' && category !== null) {
                const { title: categoryTitle } = category

                const titleToUse = categoryTitle || 'Untitled category'

                return (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {titleToUse}
                  </Badge>
                )
              }
              return null
            })}
          </div>

          <div className="">
            <h1 className="mb-6 text-3xl text-foreground md:text-5xl lg:text-6xl">{title}</h1>
          </div>

          <div className="flex flex-col md:flex-row gap-4 md:gap-16">
            {hasAuthors && (
                  <p className="text-foreground">{formatAuthors(populatedAuthors)}</p>
            )}
            {publishedAt && (
                <time className="text-muted-foreground" dateTime={publishedAt}>{formatDateTime(publishedAt)}</time>
            )}
          </div>
        </div>
      </div>
      <div className="min-h-[80vh] select-none">
        {heroImage && typeof heroImage !== 'string' && (
          <Media fill priority imgClassName="-z-10 object-cover" resource={heroImage} />
        )}
        <div className="absolute pointer-events-none left-0 bottom-0 w-full h-1/2 bg-gradient-to-t from-black to-transparent" />
      </div>
    </div>
  )
}
