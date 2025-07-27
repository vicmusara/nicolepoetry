import React, { Fragment } from 'react'

import type { Page } from '@/payload-types'

import { ArchiveBlock } from '@/blocks/ArchiveBlock/Component'
import { CallToActionBlock } from '@/blocks/CallToAction/Component'
import { ContentBlock } from '@/blocks/Content/Component'
import { FormBlock } from '@/blocks/Form/Component'
import { MediaBlock } from '@/blocks/MediaBlock/Component'
import {CodeBlock} from "@/blocks/Code/Component";
import {RelatedStories} from "@/blocks/RelatedStories/Component";
import {BannerBlock} from "@/blocks/Banner/Component";
import { BookTiles } from '@/blocks/BookTiles/Component'
import { BookSigning } from '@/blocks/BooksSigning/Component'
import AboutAuthor from '@/blocks/AboutAuthor/Component'
import Testimonials from '@/blocks/Testimonials/Component'

const blockComponents = {
  archive: ArchiveBlock,
  content: ContentBlock,
  cta: CallToActionBlock,
  formBlock: FormBlock,
  mediaBlock: MediaBlock,
  relatedStories: RelatedStories,
  code: CodeBlock,
  banner: BannerBlock,
  bookTiles: BookTiles,
  bookSigning: BookSigning,
  aboutAuthor: AboutAuthor,
  testimonials: Testimonials
}

export const RenderBlocks: React.FC<{
  blocks: Page['layout'][0][]
}> = (props) => {
  const { blocks } = props

  const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

  if (hasBlocks) {
    return (
      <Fragment>
        {blocks.map((block, index) => {
          const { blockType } = block

          if (blockType && blockType in blockComponents) {
            const Block = blockComponents[blockType]

            if (Block) {
              return (
                <div className="my-12" key={index}>
                  {/* @ts-expect-error there may be some mismatch between the expected types here */}
                  <Block {...block} disableInnerContainer />
                </div>
              )
            }
          }
          return null
        })}
      </Fragment>
    )
  }

  return null
}
