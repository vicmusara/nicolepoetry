'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import React from 'react'
import { NewsletterBlock as NewsletterBlockProps} from '@/payload-types'


export const Newsletter: React.FC<NewsletterBlockProps> = ({
                                                                  heading,
                                                                  buttonLabel = 'Subscribe',
                                                                }) => {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const email = formData.get('email')
    console.log('Subscribing email:', email)
    // Add newsletter subscription logic here
  }

  return (
    <section className="py-0 px-6 mb-0">
      <div className="container mx-auto flex max-w-2xl flex-col items-center justify-center gap-10 text-center">
        <h2 className="text-4xl font-medium text-foreground">{heading}</h2>

        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-col items-center gap-5"
        >
          <Input
            type="email"
            name="email"
            placeholder="Email address"
            required
            className="h-14 w-2/3 text-lg border-border bg-card px-4 py-3 text-start text-foreground placeholder:text-muted-foreground focus-visible:ring-2 focus-visible:ring-accent/80 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          />
          <Button
            type="submit"
            className="h-auto text-lg min-w-[180px] rounded-xs bg-primary px-5 py-3 font-medium text-foreground transition-colors hover:bg-primary-foreground"
          >
            {buttonLabel}
          </Button>
        </form>
      </div>
    </section>
  )
}
