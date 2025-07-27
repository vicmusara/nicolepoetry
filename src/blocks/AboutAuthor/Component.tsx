import Link from 'next/link';
import { Media } from '@/components/Media';
import RichText from '@/components/RichText';
import React from 'react'
import type { AboutAuthorBlock as AboutAuthorProps } from '@/payload-types';

const AboutAuthor: React.FC<AboutAuthorProps> = ({
                                                   image,
                                                   highlightText,
                                                   authorName,
                                                   bio,
                                                   readMoreLabel,
                                                   readMoreLink,
                                                   booksPublished,
                                                   awardWinningBooks
                                                 }) => {
  return (
    <section className="bg-background py-20 px-6 xl:px-0">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center">
        {/* Image Column */}
        <div className="w-full rounded-md overflow-hidden">
          <Media
            resource={image}
            className="object-cover w-full h-auto"
            priority
          />
        </div>

        {/* Text Column */}
        <div className="flex flex-col space-y-6">
          <p className="font-medium mb-2 text-sm text-foreground uppercase tracking-[0.2em]">
            {highlightText}
          </p>
          <h2 className="text-2xl mb-0 font-medium uppercase text-primary">
            {authorName}
          </h2>
          {bio && <RichText data={bio} paragraphClassName="mt-3 text-muted-foreground leading-relaxed" />}

          {readMoreLink && (
            <Link href={readMoreLink} className="font-medium text-base group inline-block w-fit text-foreground">
              <span className="flex items-center gap-2">
                {readMoreLabel}
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </span>
              <div className="h-[1px] bg-border mt-1 w-1/2 transition-all duration-300 group-hover:w-full"></div>
            </Link>
          )}

          <hr className="!my-12 border-t border-border" />

          {/* Stats */}
          <div className="flex flex-row items-center justify-center text-center gap-8">
            <div className="flex items-center gap-4">
              <span className="text-16 lg:text-[72px] font-medium text-muted-foreground leading-none">
                {(booksPublished ?? 0).toString().padStart(2, '0')}
              </span>
              <span className="text-xs lg:text-lg uppercase text-foreground tracking-wider leading-tight">
                Books<br />Published
              </span>
            </div>
            <div aria-hidden="true" className="h-20 w-px bg-border" />
            <div className="flex items-center gap-4">
              <span className="text-16 lg:text-[72px] font-medium text-muted-foreground leading-none">
                {(awardWinningBooks ?? 0).toString().padStart(2, '0')}
              </span>
              <span className="text-xs lg:text-lg uppercase text-foreground tracking-wider leading-tight">
                Award Winning<br />Books
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutAuthor;
