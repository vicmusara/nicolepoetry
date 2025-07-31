import type React from "react"
import type { Story } from "@/payload-types"
import { Card } from "@/components/Card"
import RichText from "@/components/RichText"
import { cn } from "@/utilities/ui"

type Props = {
  className?: string
  introContent?: Story["content"] | null
  docs?: Story[]
}

export const RelatedStories: React.FC<Props> = ({ className, introContent, docs }) => {
  if (!docs || docs.length === 0) return null

  return (
    <div className={cn("container", className)}>
      {introContent && ( // Only render RichText if introContent is not null/undefined
        <div className="mb-8">
          <RichText data={introContent} />
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
        {docs.map((story, index) => (
          <Card key={story.id || index} doc={story} relationTo="stories" variant="compact" />
        ))}
      </div>
    </div>
  )
}
