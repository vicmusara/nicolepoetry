import type { FieldHook } from "payload"

export const populateAuthor: FieldHook = async ({ req, operation, value }) => {
  if (operation === "create" && !value) {
    return req.user?.id
  }
  return value
}
