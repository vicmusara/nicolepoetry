import React from 'react'

import type { Page } from '@/payload-types'

import { HeroA } from '@/heros/HeroA'
import { HeroB } from '@/heros/HeroB'
import { HeroC } from '@/heros/HeroC'

const heroes = {
  heroA: HeroA,
  heroB: HeroB,
  heroC: HeroC,
}

export const RenderHero: React.FC<Page['hero']> = (props) => {
  const { type } = props || {}

  if (!type || type === 'none') return null

  const HeroToRender = heroes[type]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
