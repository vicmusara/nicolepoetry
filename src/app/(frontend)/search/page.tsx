import type { Metadata } from "next/types"

import { CollectionArchive } from "@/components/CollectionArchive"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { Search } from "@/search/Component"
import PageClient from "./page.client"
import type { CardStoryData } from "@/components/Card"
import Heading from "@/components/ui/heading"

type Args = {
  searchParams: Promise<{
    q: string
  }>
}

export default async function Page({ searchParams: searchParamsPromise }: Args) {
  const { q: query } = await searchParamsPromise
  const payload = await getPayload({ config: configPromise })

  // Query the 'stories' collection directly for search results
  const stories = await payload.find({
    collection: "stories",
    depth: 3,
    limit: 12,
    pagination: false,
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
              "meta.description": {
                like: query,
              },
            },
            {
              "meta.title": {
                like: query,
              },
            },
            {
              slug: {
                like: query,
              },
            },
            {
              "content.root.children.children.text": {
                // Search within rich text content
                like: query,
              },
            },
          ],
        },
      }
      : {}),
  })

  // The stories.docs are already Story objects, so direct casting is appropriate
  const storiesForCards: CardStoryData[] = stories.docs as CardStoryData[]

  console.log("Stories for Cards:", storiesForCards)

  return (
    <div className="pt-24 px-6 pb-24 max-w-7xl w-full mx-auto">
      <PageClient />
      <div className="container mb-16">
        <div className="prose dark:prose-invert max-w-none text-center">
          <div className="text-foreground"><Heading subtitle="Search" /></div>
          <div className="max-w-[50rem] mx-auto">
            <Search />
          </div>
        </div>
      </div>

      {storiesForCards.length > 0 ? (
        <CollectionArchive stories={storiesForCards} />
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
