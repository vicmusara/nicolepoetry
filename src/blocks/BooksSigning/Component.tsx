import Link from 'next/link';
import React from 'react'
import { Media } from '@/components/Media';
import type { BookSigningBlock as BookSigningProps } from '@/payload-types';
import Heading from '@/components/ui/heading'

export const BookSigning: React.FC<BookSigningProps> = ({
                                                   highlightText,
                                                   title,
                                                   description,
                                                   eventDate,
                                                   location,
                                                   buttonText,
                                                   buttonLink,
                                                   image,
                                                 }) => {
  const dateObj = new Date(eventDate);
  const dayMonth = dateObj.toLocaleDateString('en-US', { day: '2-digit', month: 'short' });
  const year = dateObj.getFullYear();

  return (
    <section className="py-20 lg:py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2 lg:gap-24">
          <div className="flex flex-col">
            <p className="text-small font-medium uppercase tracking-[0.2em] text-muted-foreground mb-4">
              {highlightText}
            </p>
            {title && (
              <Heading subtitle={title}/>
            )
            }

            <p className="text-body-large font-normal text-muted-foreground mb-8 leading-relaxed">
              {description}
            </p>
            <hr className="border-t border-border mb-8" />
            <div className="mb-12 flex flex-row items-center gap-8">
              <div>
                <p className="text-lg font-medium leading-tight text-muted-foreground">
                  {dayMonth}
                </p>
                <p className="text-small mt-2 font-medium tracking-[0.3em] text-muted-foreground">
                  {year}
                </p>
              </div>
              <div aria-hidden="true" className="h-20 w-px bg-border" />
              <div>
                <p className="text-small mb-2 font-medium uppercase tracking-[0.2em] text-foreground">
                  Location
                </p>
                <p className="text-body font-normal text-muted-foreground">
                  {location}
                </p>
              </div>
            </div>
            {buttonLink && (
              <Link href={buttonLink} className="font-medium text-base group inline-block w-fit text-primary">
              <span className="flex items-center gap-2">
                {buttonText}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
                <div className="h-[1px] bg-border mt-1 w-1/2 transition-all duration-300 group-hover:w-full"></div>
              </Link>
            )}
          </div>
          <div className="flex h-full w-full rounded-md overflow-hidden items-center justify-center">
            <Media
              resource={image}
              className="h-auto w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};


