import type React from "react"
import { MediaBlock } from "@/blocks/MediaBlock/Component"
import { CodeBlock, type CodeBlockProps } from "@/blocks/Code/Component"
import { BannerBlock } from "@/blocks/Banner/Component"
import { CallToActionBlock } from "@/blocks/CallToAction/Component"
import { RelatedStories as RelatedStoriesBlockComponent } from "@/blocks/RelatedStories/Component"
import { cn } from "@/utilities/ui"

import type {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  DefaultTypedEditorState,
  // Removed SerializedLexicalNode import as it's not directly exported
} from "@payloadcms/richtext-lexical"

import {
  type JSXConvertersFunction,
  LinkJSXConverter,
  RichText as PayloadRichText,
} from "@payloadcms/richtext-lexical/react"

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  RelatedStoriesBlock,
  Story, // Import Story type for filtering
} from "@/payload-types"

/* -----------------------------------------------------
 * Utilities
 * ----------------------------------------------------- */
const isHeadingTag = (tag: string): tag is "h1" | "h2" | "h3" | "h4" | "h5" | "h6" =>
  ["h1", "h2", "h3", "h4", "h5", "h6"].includes(tag)

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const doc = linkNode.fields.doc
  if (!doc) return "" // No document reference

  const { value, relationTo } = doc

  // Check if value is an object and has a slug property
  if (typeof value === "object" && value !== null && "slug" in value && typeof value.slug === "string") {
    const slug = value.slug
    return relationTo === "stories" ? `/stories/${slug}` : `/${slug}`
  }
  // If value is an ID (string) or doesn't have a slug, return an empty string
  return ""
}

/* -----------------------------------------------------
 * Props
 * ----------------------------------------------------- */
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | RelatedStoriesBlock>

type Props = {
  data: DefaultTypedEditorState | null | undefined // Allow null or undefined for optional rich text
  enableGutter?: boolean
  enableProse?: boolean
  paragraphClassName?: string
  headingClassName?: string
  listClassName?: string
  linkClassName?: string
  boldClassName?: string
  italicClassName?: string
} & React.HTMLAttributes<HTMLDivElement>

/* -----------------------------------------------------
 * Component
 * ----------------------------------------------------- */
export default function RichText({
                                   className,
                                   data,
                                   enableProse = true,
                                   enableGutter = true,
                                   paragraphClassName,
                                   headingClassName,
                                   listClassName,
                                   linkClassName,
                                   boldClassName,
                                   italicClassName,
                                   ...rest
                                 }: Props) {
  const jsxConvertersWithProps: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
    ...defaultConverters,
    ...LinkJSXConverter({ internalDocToHref }),
    heading: ({ node, nodesToJSX }) => {
      const Tag = isHeadingTag(node?.tag) ? node.tag : "h1"
      // Simplified default heading classes, relying more on prose for base styles
      // and allowing headingClassName to provide specific overrides.
      const baseHeadingClasses = "font-semibold leading-tight text-foreground"
      const sizeClasses: Record<string, string> = {
        h1: "text-4xl md:text-5xl",
        h2: "text-3xl md:text-4xl",
        h3: "text-2xl md:text-3xl",
        h4: "text-xl md:text-2xl",
        h5: "text-lg md:text-xl",
        h6: "text-base md:text-lg",
      }
      return (
        <Tag className={cn(baseHeadingClasses, sizeClasses[Tag], headingClassName)}>
          {nodesToJSX({ nodes: node.children })} {/* Removed explicit cast */}
        </Tag>
      )
    },
    paragraph: ({ node, nodesToJSX }) => (
      <p className={cn("text-muted-foreground mt-6", paragraphClassName)}>
        {nodesToJSX({ nodes: node.children })} {/* Removed explicit cast */}
      </p>
    ),
    list: ({ node, nodesToJSX }) => {
      const Tag = node?.listType === "number" ? "ol" : "ul"
      return (
        <Tag
          className={cn(
            `mt-6 ${Tag === "ul" ? "list-disc" : "list-decimal"} list-inside text-muted-foreground`,
            listClassName,
          )}
        >
          {nodesToJSX({ nodes: node.children })} {/* Removed explicit cast */}
        </Tag>
      )
    },
    link: ({ node, nodesToJSX }) => (
      <a
        href={node.fields.url}
        className={cn("text-accent-foreground hover:underline", linkClassName)}
        target={node.fields.newTab ? "_blank" : "_self"}
        rel={node.fields.newTab ? "noopener noreferrer" : undefined}
      >
        {nodesToJSX({ nodes: node.children })} {/* Removed explicit cast */}
      </a>
    ),
    bold: ({ node, nodesToJSX }) => (
      <strong className={cn("font-semibold", boldClassName)}>
        {nodesToJSX({ nodes: node.children })} {/* Removed explicit cast */}
      </strong>
    ),
    italic: ({ node, nodesToJSX }) => (
      <em className={cn("italic", italicClassName)}>
        {nodesToJSX({ nodes: node.children })} {/* Removed explicit cast */}
      </em>
    ),
    blocks: {
      banner: ({ node }) => <BannerBlock className="col-start-2 mb-4" {...node.fields} />,
      mediaBlock: ({ node }) => (
        <MediaBlock
          className="col-start-1 col-span-3"
          imgClassName="m-0"
          {...node.fields}
          captionClassName="mx-auto max-w-[48rem]"
          enableGutter={false}
          disableInnerContainer
        />
      ),
      code: ({ node }) => <CodeBlock className="col-start-2" {...node.fields} />,
      cta: ({ node }) => <CallToActionBlock {...node.fields} />,
      relatedStories: ({ node }) => {
        if (!node.fields) return null

        // Filter docs to ensure only populated Story objects are passed
        const filteredDocs = node.fields.docs?.filter(
          (doc): doc is Story => typeof doc === "object" && doc !== null && "id" in doc,
        )

        return <RelatedStoriesBlockComponent {...node.fields} docs={filteredDocs} />
      },
    },
  })

  if (!data) return null // Render nothing if data is null or undefined

  return (
    <PayloadRichText
      converters={jsxConvertersWithProps}
      className={cn(
        "payload-richtext",
        {
          container: enableGutter,
          "max-w-none": !enableGutter,
          "mx-auto prose md:prose-md": enableProse,
        },
        className,
      )}
      data={data}
      {...rest}
    />
  )
}
