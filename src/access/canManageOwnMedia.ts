import type { AccessArgs } from "payload"

import type { User } from "@/payload-types"

type canManageOwnMedia = (args: AccessArgs<User>) => boolean | { uploadedBy: { equals: string } }

export const canManageOwnMedia: canManageOwnMedia = ({ req: { user } }) => {
  // Allow super-admins to manage all media
  if (user?.roles === "super-admin") {
    return true
  }

  // Editors can only manage media they uploaded
  if (user?.roles === "editor") {
    return {
      uploadedBy: {
        equals: user.id,
      },
    }
  }

  // Deny access by default
  return false
}
