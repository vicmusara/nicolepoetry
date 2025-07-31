import type { Metadata } from "next/types"

import { CollectionArchive } from "@/components/CollectionArchive"
import { PageRange } from "@/components/PageRange"
import { Pagination } from "@/components/Pagination"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import PageClient from "./page.client"
import { notFound } from "next/navigation"
import type { CardStoryData } from "@/components/Card"

export const revalidate = 600

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
    collection: "stories",
    depth: 3, // Increased depth to populate categories, authors, and their avatars
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: true, // Bypass access control to get author data
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
    <div className="pt-24 pb-24">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none">
          <h1>Stories</h1>
        </div>
      </div>

      <div className="container mb-8">
        <PageRange collection="stories" currentPage={stories.page} limit={12} totalDocs={stories.totalDocs} />
      </div>

      <CollectionArchive stories={stories.docs as CardStoryData[]} />

      <div className="container">
        {stories?.page && stories?.totalPages > 1 && <Pagination page={stories.page} totalPages={stories.totalPages} />}
      </div>
    </div>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise
  return {
    title: `Stories Page ${pageNumber || ""}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: "stories",
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 10)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
