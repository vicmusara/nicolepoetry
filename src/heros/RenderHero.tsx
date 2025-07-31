import type React from "react"

import type { Page } from "@/payload-types"
import { HomeHero } from '@/heros/HomeHero'
import { MediumImpact } from '@/heros/MediumImpact'
import { LowImpact } from '@/heros/LowImpact' // Ensure correct import path

const heroes = {
  homeHero: HomeHero,
  mediumImpact: MediumImpact,
  lowImpact: LowImpact,
}

export const RenderHero: React.FC<Page["hero"]> = (props) => {
  const { type } = props || {}

  if (!type || type === "none") return null

  const HeroToRender = heroes[type as keyof typeof heroes]

  if (!HeroToRender) return null

  return <HeroToRender {...props} />
}
