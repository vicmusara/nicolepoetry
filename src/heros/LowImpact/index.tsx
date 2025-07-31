import type React from "react"

import type { Page } from "@/payload-types" // Corrected import path for Page type

import RichText from "@/components/RichText"

type LowImpactType =
  | {
  children?: React.ReactNode
  richText?: never
}
  | (Omit<Page["hero"], "richText"> & {
  children?: never
  richText?: Page["hero"]["richText"]
})

export const LowImpact: React.FC<LowImpactType> = ({ children, richText }) => {
  return (
    <div className="container mt-16">
      <div className="max-w-[48rem]">{children || (richText && <RichText data={richText} enableGutter={false} />)}</div>
    </div>
  )
}
