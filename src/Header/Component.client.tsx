'use client'

import type { Header } from '@/payload-types'

import { Logo } from '@/components/Logo/Logo'
import { HeaderNav } from './Nav'
import React from 'react'
import { cn } from '@/lib/utils'

interface HeaderClientProps {
  data: Header
}

export const HeaderClient: React.FC<HeaderClientProps> = ({ data }) => {

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 bg-primary-dark/95 backdrop-blur-sm shadow-lg"
    )}>
      <div className="py-4 max-w-7xl mx-auto flex justify-between items-center">
          <Logo />
        <HeaderNav data={data} />
      </div>
    </header>
  )
}
