"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import type React from "react"
import { useState, useEffect } from "react"
import { useDebounce } from "@/utilities/useDebounce"
import { useRouter, useSearchParams } from "next/navigation"
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline' // Import useSearchParams

export const Search: React.FC = () => {
  const [value, setValue] = useState("")
  const router = useRouter()
  const searchParams = useSearchParams() // Initialize useSearchParams
  const debouncedValue = useDebounce(value, 500) // Added a debounce delay for better UX

  useEffect(() => {
    const currentQuery = searchParams.get("q") // Get 'q' parameter from URL

    // Only navigate if there's a debounced value
    if (debouncedValue) {
      router.push(`/search?q=${debouncedValue}`)
    } else if (value === "" && currentQuery) {
      // Check currentQuery instead of router.query?.q
      // Clear search results if input is cleared and there was a query
      router.push("/search")
    }
  }, [debouncedValue, router, value, searchParams]) // Add searchParams to dependency array

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          // On explicit submit (e.g., pressing Enter or clicking the button),
          // immediately navigate with the current value, bypassing debounce for instant feedback.
          router.push(`/search?q=${value}`)
        }}
        className="flex gap-2" // Flex container for side-by-side layout
      >
        <Label htmlFor="search" className="sr-only">
          Search
        </Label>
        <Input
          id="search"
          type="search" // Semantic type for search input
          value={value} // Control the input value
          onChange={(event) => {
            setValue(event.target.value)
          }}
          placeholder="Search stories, poems..."
          className="flex-1" // Allow input to take available space
        />
        <Button type="submit" size="icon">
          {" "}
          <MagnifyingGlassIcon className="h-4 w-4" /> {/* Search icon */}
          <span className="sr-only">Search</span> {/* Screen reader text for button */}
        </Button>
      </form>
    </div>
  )
}
