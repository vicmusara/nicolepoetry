'use client'

import { cn } from '@/utilities/ui'
import useClickableCard from '@/utilities/useClickableCard'
import Link from 'next/link'
import React from 'react'
import type { Story, Media as MediaType } from '@/payload-types'
import { Media } from '@/components/Media'

export type CardStoryData = Pick<
  Story,
  'slug' | 'categories' | 'meta' | 'title' | 'createdAt' | 'populatedAuthors'
> & {
  authors?: Story['authors']
  populatedAuthors?:
    | {
        id?: string | null
        name?: string | null
        avatar?: string | MediaType | null
        role?: string
      }[]
    | null
}

export const Card: React.FC<{
  className?: string
  doc?: CardStoryData
  relationTo?: 'stories'
  showCategories?: boolean
  variant?: 'default' | 'compact'
}> = ({ className, doc, relationTo = 'stories', variant = 'default' }) => {
  const { card, link } = useClickableCard({})

  if (!doc) return null

  const { slug, title, meta, categories, createdAt, populatedAuthors } = doc

  const href = `/${relationTo}/${slug}`
  const description = meta?.description || ''
  const date = createdAt
    ? new Date(createdAt).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      })
    : ''
  const mainImage = meta?.image as MediaType

  const categoryTitle =
    categories &&
    Array.isArray(categories) &&
    categories.length > 0 &&
    typeof categories[0] === 'object'
      ? categories[0]?.title
      : 'Uncategorized'

  const hasAuthors = populatedAuthors && populatedAuthors.length > 0
  const firstAuthor = hasAuthors ? populatedAuthors[0] : null

  return (
    <article
      ref={card.ref}
      className={cn(
        'group flex flex-col md:flex-row gap-4 md:gap-6 p-4 md:p-6 mx-auto',
        variant === 'compact' ? 'max-w-lg' : 'max-w-3xl',
        'hover:bg-accent/10 transition-colors',
        className,
      )}
    >
      {/* Image */}
      <Link
        href={href}
        ref={link.ref}
        className={cn(
          'w-full md:w-60 flex-shrink-0 overflow-hidden rounded-lg',
          variant === 'compact' && 'md:w-40',
        )}
      >
        {mainImage ? (
          <Media
            resource={mainImage}
            alt={mainImage.alt || title}
            imgClassName={cn(
              'aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-105',
              variant === 'compact' && 'aspect-[3/4]',
            )}
          />
        ) : (
          <div className="aspect-[4/3] w-full rounded-lg bg-muted flex items-center justify-center text-sm text-muted-foreground">
            No image
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="flex flex-1 flex-col justify-between min-h-0">
        {/* Header with date and category */}
        <div className="flex items-center gap-x-4 text-xs text-muted-foreground mb-2">
          <time dateTime={createdAt}>{date}</time>
          <span>{categoryTitle}</span>
        </div>

        {/* Title and description */}
        <div className="flex-1">
          <h3
            className={cn(
              'font-semibold leading-tight text-foreground mb-3 transition-colors group-hover:text-accent',
              variant === 'compact' ? 'text-lg' : 'text-xl',
            )}
          >
            <Link href={href} ref={link.ref} className="relative block">
              <span className="absolute inset-0" />
              {title}
            </Link>
          </h3>
          <p
            className={cn(
              'text-muted-foreground leading-relaxed transition-colors group-hover:text-foreground mb-4',
              variant === 'compact' ? 'text-xs' : 'text-sm',
            )}
          >
            {description}
          </p>
        </div>

        <hr className="border-border my-4" />

        {/* Author */}
        {hasAuthors && firstAuthor && (
          <div className="flex items-center gap-x-4">
            <Media
              resource={firstAuthor.avatar}
              alt={firstAuthor.name || 'Author'}
              imgClassName={cn(
                'h-10 w-10 rounded-full object-cover',
                variant === 'compact' && 'h-8 w-8',
              )}
            />
            <div className={cn('leading-6', variant === 'compact' ? 'text-xs' : 'text-sm')}>
              <p className="font-semibold text-foreground">
                {firstAuthor.name || 'Unknown Author'}
              </p>
            </div>
          </div>
        )}
      </div>
    </article>
  )
}
