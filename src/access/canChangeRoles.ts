import type { FieldAccess } from "payload"

import type { User } from "@/payload-types"

export const canChangeRoles: FieldAccess<any, User> = ({ req: { user } }) => {
  // Only super-admins can change roles
  return user?.roles === "super-admin" // Changed from .includes()
}
