"use client"

import { Button, type ButtonProps } from "@/components/ui/button"
import { cn } from "@/utilities/ui"
import Link from "next/link"
import type React from "react"

// Ensure these imports are from your current project's payload-types.ts
import type { Page, Story } from "@/payload-types"

type CMSLinkType = {
  appearance?: "inline" | ButtonProps["variant"]
  children?: React.ReactNode
  className?: string
  label?: string | null
  newTab?: boolean | null
  // Adjusted reference type to explicitly use Page | Story for value
  reference?: {
    relationTo: "pages" | "stories" // Ensure 'stories' is included, and 'posts' is removed if not applicable
    value: Page | Story | string // Value can be a populated object or just its ID (string)
  } | null
  size?: ButtonProps["size"] | null
  type?: "custom" | "reference" | "anchor" | null
  url?: string | null
  anchor?: string | null
}

export const CMSLink: React.FC<CMSLinkType> = (props) => {
  const {
    type,
    appearance = "inline",
    children,
    className,
    label,
    newTab,
    reference,
    size: sizeFromProps,
    url,
    anchor,
  } = props

  let href = ""

  if (type === "reference" && reference) {
    if (typeof reference.value === "object" && "slug" in reference.value && typeof reference.value.slug === "string") {
      // If the reference is a populated object with a slug
      href = `${reference.relationTo !== "pages" ? `/${reference.relationTo}` : ""}/${reference.value.slug}`
    } else if (typeof reference.value === "string") {
      // If the reference is just an ID (string), we might need to construct the URL differently
      // For now, we'll assume populated objects are always passed for reference links that need slugs.
      // If you need to handle unpopulated IDs, you'd fetch the slug here or pass it differently.
      // For simplicity, if it's just an ID, we'll treat it as a custom URL for now or handle it as a fallback.
      href = `/${reference.relationTo}/${reference.value}` // Fallback for unpopulated IDs, might not be correct for all cases
    }
  } else if (type === "anchor" && anchor) {
    href = `/#${anchor}`
  } else if (url) {
    href = url
  }

  if (!href) return null

  const size = appearance === "link" ? "clear" : sizeFromProps
  const newTabProps = newTab ? { rel: "noopener noreferrer", target: "_blank" } : {}

  const handleAnchorClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (type === "anchor" && anchor) {
      if (window.location.pathname === "/") {
        e.preventDefault()
        const element = document.getElementById(anchor)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
      // If not on homepage, do not preventDefault so Next.js navigates
    }
  }

  /* Ensure we don't break any styles set by richText */
  if (appearance === "inline") {
    return (
      <Link
        className={cn(className)}
        href={href}
        {...newTabProps}
        onClick={handleAnchorClick}
        {...(type === "anchor" ? { scroll: false } : {})}
      >
        {label && label}
        {children && children}
      </Link>
    )
  }

  return (
    <Button asChild className={className} size={size} variant={appearance}>
      <Link
        className={cn(className)}
        href={href}
        {...newTabProps}
        onClick={handleAnchorClick}
        {...(type === "anchor" ? { scroll: false } : {})}
      >
        {label && label}
        {children && children}
      </Link>
    </Button>
  )
}
