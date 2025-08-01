import type { CollectionConfig } from "payload"

import { anyone } from "@/access/anyone"
import { authenticated } from "@/access/authenticated"
import { slugField } from "@/fields/slug"

export const Categories: CollectionConfig = {
  slug: "categories",
  access: {
    create: authenticated, // All authenticated users can create
    delete: authenticated, // All authenticated users can delete
    read: anyone, // Public can read
    update: authenticated, // All authenticated users can update
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    ...slugField(),
  ],
}
