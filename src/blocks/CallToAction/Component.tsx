import React from 'react'

import type { CallToActionBlock as CTABlockProps } from '@/payload-types'

import RichText from '@/components/RichText'
import { CMSLink } from '@/components/Link'

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-none border-t-border border-b-border border-t border-b p-4 flex flex-col gap-8 md:flex-row md:justify-start md:items-end">
        <div className="max-w-[48rem] flex items-center">
          {richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
        </div>
        <div className="flex flex-col gap-8">
          {(links || []).map(({ link }, i) => {
            return <CMSLink key={i} size="sm" className="text-foreground w-auto self-start md:self-auto" {...link} />
          })}
        </div>
      </div>
    </div>
  )
}
