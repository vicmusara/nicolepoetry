import type { FieldHook } from "payload"

export const populateUploadedBy: FieldHook = async ({ req, operation, value }) => {
  if (operation === "create" && !value) {
    return req.user?.id
  }
  return value
}
