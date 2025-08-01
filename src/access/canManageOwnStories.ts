import type { AccessArgs } from "payload"

import type { User } from "@/payload-types"

type canManageOwnStories = (args: AccessArgs<User>) => boolean | { authors: { in: string[] } }

export const canManageOwnStories: canManageOwnStories = ({ req: { user } }) => {
  // Allow super-admins to manage all stories
  if (user?.roles === "super-admin") {
    return true
  }

  // Editors can only manage stories where they are listed as an author
  if (user?.roles === "editor") {
    if (user) {
      return {
        authors: {
          in: [user.id], // Check if the current user's ID is present in the 'authors' array
        },
      }
    }
  }

  // Deny access by default
  return false
}
