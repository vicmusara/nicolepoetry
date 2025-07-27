'use client'
import React from 'react'
import type { Page } from '@/payload-types'
import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import Heading from '@/components/ui/heading'

export const HeroA: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
  subtitle,
  featuredLogos
}) => {
  return (
    <section className="pt:4 mt:2 lg:pt-8 pb-4 lg:max-h-[calc(100vh-100px)] lg:mt-8 lg:p-5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-10">

          <div className="lg:w-1/2 xl:w-5/12 text-center lg:text-left">
            {subtitle && (
              <Heading subtitle={subtitle}/>
            )}

            {richText && (
              <RichText
              data={richText}
            />
            )}

            {Array.isArray(links) && links.length > 0 && (
              <div className="mt-8">
                {links.map(({ link }, i) => (
                  <CMSLink
                    key={i}
                    {...link}
                    className="inline-flex items-center justify-center bg-primary text-center text-foreground font-semibold py-2 px-4 rounded-lg hover:bg-primary-foreground hover:ease-in-out mr-4"/>
                ))}
              </div>
            )}

            {Array.isArray(featuredLogos) && featuredLogos.length > 0 && (
              <div className="mt-9">
                <p className="text-muted-foreground text-sm">As featured on:</p>
                <div className="flex items-center justify-start gap-8 mt-5 flex-wrap">
                  {featuredLogos.map((logo, i) => (
                    <div key={i} className="h-6">
                      {typeof logo === 'object' && (
                        <Media
                          resource={logo.logo}
                          imgClassName="h-6 w-auto rounded-full object-contain"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="lg:w-1/2 xl:w-7/12 order-first lg:order-last flex justify-center lg:justify-end mt-8 lg:mt-0">
            {media && typeof media === 'object' && (
              <div className="rounded-lg shadow-2xl shadow-black/40 overflow-hidden">
                <Media
                  resource={media}
                  imgClassName="w-full lg:max-h-[calc(100vh-200px)] max-h-[calc(100vh-300px)]"
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}