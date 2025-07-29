import React from 'react'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import { CodeBlock, CodeBlockProps } from '@/blocks/Code/Component'
import { BannerBlock } from '@/blocks/Banner/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { RelatedStories as RelatedStoriesBlockComponent } from '@/blocks/RelatedStories/Component'
import { cn } from '@/utilities/ui'

import {
  DefaultNodeTypes,
  SerializedBlockNode,
  SerializedLinkNode,
  type DefaultTypedEditorState,
} from '@payloadcms/richtext-lexical'

import {
  JSXConvertersFunction,
  LinkJSXConverter,
  RichText as PayloadRichText,
} from '@payloadcms/richtext-lexical/react'

import type {
  BannerBlock as BannerBlockProps,
  CallToActionBlock as CTABlockProps,
  MediaBlock as MediaBlockProps,
  RelatedStoriesBlock,
} from '@/payload-types'

/* -----------------------------------------------------
 * Utilities
 * ----------------------------------------------------- */
const isHeadingTag = (tag: string): tag is 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' =>
  ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].includes(tag)

const internalDocToHref = ({ linkNode }: { linkNode: SerializedLinkNode }) => {
  const { value, relationTo } = linkNode.fields.doc!
  if (typeof value !== 'object') throw new Error('Expected value to be an object')
  const slug = value.slug
  return relationTo === 'stories' ? `/stories/${slug}` : `/${slug}`
}

/* -----------------------------------------------------
 * Props
 * ----------------------------------------------------- */
type NodeTypes =
  | DefaultNodeTypes
  | SerializedBlockNode<
      CTABlockProps | MediaBlockProps | BannerBlockProps | CodeBlockProps | RelatedStoriesBlock
    >

type Props = {
  data: DefaultTypedEditorState
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
      const Tag = isHeadingTag(node?.tag) ? node.tag : 'h1'
      const headingClasses: Record<string, string> = {
        h1: 'lg:text-5xl text-xl font-medium text-foreground leading-tight',
        h2: 'lg:text-4xl text-xl font-medium text-foreground leading-tight',
        h3: 'lg:text-3xl text-xl font-medium text-foreground leading-tight',
        h4: 'lg:text-2xl text-xl font-medium text-foreground leading-tight',
        h5: 'lg:text-xl text-xl font-medium text-foreground leading-tight',
        h6: 'lg:text-lg text-xl font-medium text-foreground leading-tight',
      }
      return (
        <Tag className={cn(headingClasses[Tag], headingClassName)}>
          {nodesToJSX({ nodes: node.children })}
        </Tag>
      )
    },
    paragraph: ({ node, nodesToJSX }) => (
      <p className={cn('text-muted-foreground mt-6', paragraphClassName)}>
        {nodesToJSX({ nodes: node.children })}
      </p>
    ),
    list: ({ node, nodesToJSX }) => {
      const Tag = node?.listType === 'number' ? 'ol' : 'ul'
      return (
        <Tag
          className={cn(
            `mt-6 ${Tag === 'ul' ? 'list-disc' : 'list-decimal'} list-inside text-muted-foreground`,
            listClassName,
          )}
        >
          {nodesToJSX({ nodes: node.children })}
        </Tag>
      )
    },
    link: ({ node, nodesToJSX }) => (
      <a
        href={node.fields.url}
        className={cn('text-accent-foreground hover:underline', linkClassName)}
        target={node.fields.newTab ? '_blank' : '_self'}
        rel={node.fields.newTab ? 'noopener noreferrer' : undefined}
      >
        {nodesToJSX({ nodes: node.children })}
      </a>
    ),
    bold: ({ node, nodesToJSX }) => (
      <strong className={cn('font-semibold', boldClassName)}>
        {nodesToJSX({ nodes: node.children })}
      </strong>
    ),
    italic: ({ node, nodesToJSX }) => (
      <em className={cn('italic', italicClassName)}>{nodesToJSX({ nodes: node.children })}</em>
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
      relatedStories: ({ node }) => <RelatedStoriesBlockComponent {...node.fields} />,
    },
  })

  return (
    <PayloadRichText
      converters={jsxConvertersWithProps}
      className={cn(
        'payload-richtext',
        {
          container: enableGutter,
          'max-w-none': !enableGutter,
          'mx-auto prose md:prose-md': enableProse,
        },
        className,
      )}
      data={data}
      {...rest}
    />
  )
}
