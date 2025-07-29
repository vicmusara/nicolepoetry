import React from 'react'

import { Card, CardStoryData } from '@/components/Card'

export type Props = {
  stories: CardStoryData[]
}

export const CollectionArchive: React.FC<Props> = ({ stories }) => {
  if (!stories || stories.length === 0) return null

  return (
    <section className="container">
      <div className="grid grid-cols-1 gap-y-12 sm:gap-y-16">
        {stories.map((story, index) => {
          if (typeof story === 'object' && story !== null) {
            return (
              <Card
                key={index}
                doc={story}
                relationTo="stories"
                className="w-full"
              />
            )
          }

          return null
        })}
      </div>
    </section>
  )
}
