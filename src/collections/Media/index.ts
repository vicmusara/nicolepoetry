import type { CollectionConfig } from "payload"

import { FixedToolbarFeature, InlineToolbarFeature, lexicalEditor } from "@payloadcms/richtext-lexical"
import path from "path"
import { fileURLToPath } from "url"

import { anyone } from "@/access/anyone"
import { authenticated } from "@/access/authenticated"
import { isAdmin } from "@/access/isAdmin"
import { canManageOwnMedia } from "@/access/canManageOwnMedia"
import { populateUploadedBy } from "./hooks/populateUploadedBy"

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export const Media: CollectionConfig = {
  slug: "media",
  access: {
    create: authenticated, // Anyone authenticated can upload
    read: anyone, // Public can read all media
    update: canManageOwnMedia, // Editors can update their own, super-admins can update all
    delete: isAdmin, // Only super-admins can delete
  },
  fields: [
    {
      name: "alt",
      type: "text",
      //required: true,
    },
    {
      name: "caption",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature()]
        },
      }),
    },
    {
      name: "uploadedBy",
      type: "relationship",
      relationTo: "users",
      required: true,
      defaultValue: ({ user }) => user?.id, // Automatically set the uploader to the current user
      admin: {
        readOnly: true, // Prevent manual changes
        hidden: true, // Hide from admin UI
      },
      hooks: {
        beforeChange: [populateUploadedBy],
      },
    },
  ],
  upload: {
    // Upload to the public/media directory in Next.js making them publicly accessible even outside of Payload
    staticDir: path.resolve(dirname, "../../public/media"),
    adminThumbnail: "thumbnail",
    focalPoint: true,
    imageSizes: [
      {
        name: "thumbnail",
        width: 300,
      },
      {
        name: "square",
        width: 500,
        height: 500,
      },
      {
        name: "small",
        width: 600,
      },
      {
        name: "medium",
        width: 900,
      },
      {
        name: "large",
        width: 1400,
      },
      {
        name: "xlarge",
        width: 1920,
      },
      {
        name: "og",
        width: 1200,
        height: 630,
        crop: "center",
      },
    ],
  },
}
