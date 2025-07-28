import React from 'react'
import { Menu } from 'lucide-react'
import Link from 'next/link'
import type { Header as HeaderType } from '@/payload-types'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'
import { CMSLink } from '@/components/Link'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { SheetTitle } from '@/components/ui/sheet'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className="flex h-12 items-center justify-between px-4">
      {/* Desktop Navigation */}
      <div className="hidden items-center gap-8 md:flex">
        {navItems.map(({ link }, i) => {
          return (
            <CMSLink
              key={i}
              {...link}
              appearance="link"
              className="text-md text-foreground uppercase transition-colors hover:text-primary"
            />
          )
        })}
        <Link href="/search">
          <span className="sr-only">Search</span>
          <MagnifyingGlassIcon className="w-5 text-foreground transition-colors hover:text-primary" />
        </Link>
      </div>

      {/* Mobile Navigation */}
      <Sheet>
        <SheetTrigger asChild className="text-foreground md:hidden">
          <Button variant="outline" size="icon">
            <Menu className="size-5 text-foreground" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right">
          <SheetTitle className="sr-only">Menu</SheetTitle>
          <div className="mt-8 flex flex-col pl-5 gap-4">
            {navItems.map(({ link }, i) => {
              return (
                <CMSLink
                  key={i}
                  {...link}
                  appearance="link"
                  className="text-sm text-foreground uppercase transition-colors hover:text-muted-foreground"
                />
              )
            })}
            <hr className="my-4" />
            <Link href="/search">
              <span className="sr-only">Search</span>
              <MagnifyingGlassIcon className="w-5 text-foreground transition-colors hover:text-muted-foreground" />
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  )
}
