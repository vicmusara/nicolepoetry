import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import React from 'react'
import type { BooksTilesBlock as BookTilesProps } from '@/payload-types'
import { Media } from '@/components/Media'
import Heading from '@/components/ui/heading'

export const BookTiles: React.FC<BookTilesProps> = ({ title, viewAllLink, books }) => {
  return (
    <section id="#books" className="py-0 mt-0 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-12">
          {title && <Heading subtitle={title} />}
          {viewAllLink && (
            <Link
              href={viewAllLink}
              className="group inline-flex items-center text-center text-primary hover:text-primary-foreground transition-colors duration-300"
            >
              <span className="text-sm md:text-base">View All Books</span>
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 justify-items-center">
          {books?.map((book, index) => (
            <div
              key={index}
              className="flex flex-col items-center justify-center text-center group w-full"
            >
              <Link href={book.orderLink} className="w-auto hover:shadow mb-6 flex justify-center">
                <div className="transition-transform border border-border duration-300 group-hover:scale-105 group-hover:shadow-[0_8px_16px_rgba(var(--color-subtle-shadow-rgb),0.5)] group-hover:border-2 group-hover:border-primary-foreground rounded-md overflow-hidden">
                  {book.image && (
                    <Media
                      resource={book.image}
                      imgClassName="w-auto sm:max-h-[calc(100vh-800px)] md:max-h-[calc(100vh-600px)] lg:max-h-[calc(100vh-200px)]"
                      priority
                    />
                  )}
                </div>
              </Link>
              <Link
                href={book.orderLink}
                className="text-foreground mb-0 hover:text-muted-foreground hover:scale-105 transition-colors duration-300 flex justify-center"
              >
                <h3 className="text-sm mx-auto md:text-lg lg:text-xl w-80 font-bold text-foreground mb-4 group-hover:text-muted-foreground transition-colors duration-300 text-center">
                  {book.title}
                </h3>
              </Link>
              <Link
                href={book.orderLink}
                className="inline-flex mt-0 pt-0 items-center justify-center text-primary group-hover:text-primary-foreground transition-colors duration-300"
              >
                <span className="text-xs mx-auto md:text-sm font-normal pb-1 border-b-[1px] border-primary-foreground group-hover:border-text-primary transition-colors duration-300 text-center">
                  Order Your Copy
                </span>
                <ArrowRight className="ml-2 h-4 w-4 transition-all duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
