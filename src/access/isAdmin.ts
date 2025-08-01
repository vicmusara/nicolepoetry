import type { AccessArgs } from "payload"

import type { User } from "@/payload-types"

type isAdmin = (args: AccessArgs<User>) => boolean

export const isAdmin: isAdmin = ({ req: { user } }) => {
  // Return true if user has a super-admin role
  return Boolean(user?.roles?.includes("super-admin"))
}
