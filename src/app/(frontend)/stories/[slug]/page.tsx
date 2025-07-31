import type { Metadata } from "next"

import { RelatedStories } from "@/blocks/RelatedStories/Component"
import { PayloadRedirects } from "@/components/PayloadRedirects"
import configPromise from "@payload-config"
import { getPayload } from "payload"
import { draftMode } from "next/headers"
import { cache } from "react"
import RichText from "@/components/RichText"

import { StoryHero } from "@/heros/StoryHero"
import { generateMeta } from "@/utilities/generateMeta"
import PageClient from "./page.client"
import { LivePreviewListener } from "@/components/LivePreviewListener"

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const stories = await payload.find({
    collection: "stories",
    draft: false,
    limit: 1000,
    overrideAccess: false,
    pagination: false,
    select: {
      slug: true,
    },
  })

  return stories.docs.map(({ slug }) => {
    return { slug }
  })
}

type Args = {
  params: Promise<{
    slug?: string
  }>
}

export default async function Post({ params: paramsPromise }: Args) {
  const { isEnabled: draft } = await draftMode()
  const { slug = "" } = await paramsPromise
  const url = "/stories/" + slug
  const story = await queryPostBySlug({ slug })

  if (!story) return <PayloadRedirects url={url} />

  return (
    <article className="mt-36 pt-20 pb-16">
      <PageClient />

      {/* Allows redirects for valid pages too */}
      <PayloadRedirects disableNotFound url={url} />

      {draft && <LivePreviewListener />}

      <StoryHero story={story} />

      <div className="flex flex-col items-center px-8 gap-4 pt-8">
        <div className="container">
          <RichText className="max-w-[48rem] mx-auto" data={story.content} enableGutter={false} />
          {story.relatedStories && story.relatedStories.length > 0 && (
            <RelatedStories
              className="mt-12 max-w-[52rem] lg:grid lg:grid-cols-subgrid col-start-1 col-span-3 grid-rows-[2fr]"
              docs={story.relatedStories.filter((story) => typeof story === "object")}
            />
          )}
        </div>
      </div>
    </article>
  )
}

export async function generateMetadata({ params: paramsPromise }: Args): Promise<Metadata> {
  const { slug = "" } = await paramsPromise
  const post = await queryPostBySlug({ slug })

  return generateMeta({ doc: post })
}

const queryPostBySlug = cache(async ({ slug }: { slug: string }) => {
  const { isEnabled: draft } = await draftMode()

  const payload = await getPayload({ config: configPromise })

  const result = await payload.find({
    collection: "stories",
    depth: 3, // Increased depth to populate related stories, authors, and their avatars
    draft,
    limit: 1,
    overrideAccess: draft,
    pagination: false,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  return result.docs?.[0] || null
})
