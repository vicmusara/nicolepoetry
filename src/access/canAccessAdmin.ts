import type { AccessArgs } from "payload"

import type { User } from "@/payload-types"

type canAccessAdmin = (args: AccessArgs<User>) => boolean

export const canAccessAdmin: canAccessAdmin = ({ req: { user } }) => {
  // Allow access to the admin panel if the user is either a super-admin or an editor
  return Boolean(user?.roles === "super-admin" || user?.roles === "editor")
}
