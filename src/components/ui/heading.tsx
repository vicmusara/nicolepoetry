import React from 'react'

export default function Heading({ subtitle }: { subtitle: string }) {
  return (
    <h6 className="font-semibold text-xl text-foreground uppercase tracking-[0.2em] mb-4">
      {subtitle}
    </h6>
  )
}