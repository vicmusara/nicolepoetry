import type { Metadata } from "next/types"
import { getPayload } from "payload"
import configPromise from "@payload-config"

import { CollectionArchive } from "@/components/CollectionArchive"
import { PageRange } from "@/components/PageRange"
import { Pagination } from "@/components/Pagination"
import PageClient from "./page.client"
import Heading from "@/components/ui/heading"
import type { CardStoryData } from "@/components/Card"

export const dynamic = "force-static"
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const stories = await payload.find({
    collection: "stories",
    depth: 3, // Increased depth to populate categories, authors, and their avatars
    limit: 12,
    overrideAccess: true, // Bypass access control to get author data
    sort: "-createdAt",
    select: {
      title: true,
      slug: true,
      categories: true,
      meta: true,
      createdAt: true,
      authors: true, // Ensure authors are selected for population
      populatedAuthors: true, // Ensure populatedAuthors are selected
    },
  })

  return (
    <div className="flex flex-col items-center px-6 sm:px-10 justify-center">
      <div className="pt-24 pb-24 max-w-7xl w-full">
        <PageClient />

        {/* Heading */}

          <div className="text-foreground container mb-16 text-center">
            <Heading subtitle="Stories" />
          </div>



        {/* Page range info */}
        <div className="container mb-8">
          <PageRange collection="stories" currentPage={stories.page} limit={12} totalDocs={stories.totalDocs} />
        </div>

        {/* Archive */}
        <CollectionArchive stories={stories.docs as CardStoryData[]} />

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
    title: "Stories",
  }
}
