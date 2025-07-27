'use client'

import { Swiper, SwiperSlide } from 'swiper/react'
import { Autoplay } from 'swiper/modules'
import 'swiper/css'
import 'swiper/css/autoplay'
import { Media } from '@/components/Media'
import React from 'react'

import type { TestimonialsBlock as TestimonialProps } from '@/payload-types'
import RichText from '@/components/RichText'
import Link from 'next/link'

const Testimonials: React.FC<TestimonialProps> = ({ backgroundImage, testimonials }) => {
  const hasMultiple = (testimonials?.length ?? 0) > 1

  return (
    <section className="relative bg-dark-background text-foreground py-10 md:py-20">
      {/* Background Image & Overlay */}
      <div className="absolute inset-0 z-0">
        <Media resource={backgroundImage} className="object-cover" fill />
        <div className="absolute inset-0" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-lg mx-auto px-6 rounded-md bg-background/95">
        <div className="max-w-6xl md:h-full mx-auto flex flex-col items-center justify-center bg-dark-background/60 p-10 rounded-lg">
          <span className="font-serif text-9xl  mb-4 w-16 h-16 leading-none text-muted-foreground">
            “
          </span>
          {hasMultiple ? (
            <Swiper
              modules={[Autoplay]}
              autoplay={{
                delay: 6000,
                disableOnInteraction: true,
              }}
              loop
              className="w-full m-0"
            >
              {testimonials?.map((item, idx) => (
                <SwiperSlide key={idx}>
                  <RichText
                    data={item.quote}
                    paragraphClassName="text-md text-center mt-2 lg:text-2xl"
                    enableProse={false}
                    enableGutter={false}
                  />
                  {item.signature && (
                    <div className="mb-6 flex justify-center">
                      <Media resource={testimonials[0].signature} imgClassName="w-36 h-auto" priority/>
                    </div>
                  )}
                  <div className="text-md mt-0 font-normal text-foreground">{item.reviewer}</div>
                  {testimonials?.[0]?.bookOrderLink && (
                    <div className="flex items-center text-xs justify-center gap-1">
                      <span className="italic text-muted-foreground">—on </span>
                      <Link
                        href={testimonials?.[0]?.bookOrderLink}
                        className="italic text-foreground underline hover:text-primary"
                      >
                        {testimonials?.[0]?.reviewedBook}
                      </Link>
                    </div>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <>
              <RichText
                data={
                  testimonials?.[0]?.quote ?? {
                    root: {
                      type: 'root',
                      children: [],
                      direction: null,
                      format: '',
                      indent: 0,
                      version: 1,
                    },
                  }
                }
                paragraphClassName="text-md text-center mt-2 lg:text-2xl"
                enableProse={false}
                enableGutter={false}
              />
              {testimonials?.[0]?.signature && (
                <div className="mt-4 p-0 mb-0 flex justify-center">
                  <Media resource={testimonials[0].signature} imgClassName="w-36 h-auto" priority/>
                </div>
              )}
              <p className="text-md mt-0 font-normal text-foreground">
                {testimonials?.[0]?.reviewer}
              </p>
              {testimonials?.[0]?.bookOrderLink && (
                <div className="flex items-center text-xs justify-center gap-1">
                  <span className="italic text-muted-foreground">—on </span>
                  <Link
                    href={testimonials?.[0]?.bookOrderLink}
                    className="italic text-foreground underline hover:text-primary"
                  >
                    {testimonials?.[0]?.reviewedBook}
                  </Link>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  )
}

export default Testimonials
