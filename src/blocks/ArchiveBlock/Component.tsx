import type { ArchiveBlock as ArchiveBlockProps, Story } from "@/payload-types"
import type { CardStoryData } from "@/components/Card"

import configPromise from "@payload-config"
import { getPayload } from "payload"
import type React from "react"
import RichText from "@/components/RichText"

import { CollectionArchive } from "@/components/CollectionArchive"

export const ArchiveBlock: React.FC<
  ArchiveBlockProps & {
  id?: string
}
> = async (props) => {
  const { id, categories, introContent, limit: limitFromProps, populateBy, selectedDocs } = props

  const limit = limitFromProps || 3

  let stories: CardStoryData[] = [] // Explicitly type stories as CardStoryData[]

  if (populateBy === "collection") {
    const payload = await getPayload({ config: configPromise })

    // Flatten categories to get an array of IDs for the 'in' query
    const flattenedCategories = categories
      ?.map((category) => {
        if (typeof category === "object" && category !== null) return category.id
        return category // If it's already a string ID
      })
      .filter(Boolean) as string[] // Ensure it's an array of strings

    const fetchedStories = await payload.find({
      collection: "stories",
      depth: 3, // Ensure categories, authors, and their avatars are populated
      limit,
      overrideAccess: true, // Bypass access control to get author data
      // No need to manually select fields if depth is sufficient for CardStoryData
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

    // Cast directly to CardStoryData[] as Payload should populate correctly with depth: 3
    stories = fetchedStories.docs as CardStoryData[]
  } else {
    if (selectedDocs?.length) {
      // Filter selectedDocs to ensure only populated Story objects are included
      stories = selectedDocs
        .map((doc) => {
          if (typeof doc.value === "object" && doc.value !== null && "id" in doc.value) {
            return doc.value as Story // Cast to Story
          }
          return null
        })
        .filter(Boolean) as CardStoryData[] // Filter out nulls and cast to CardStoryData[]
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
