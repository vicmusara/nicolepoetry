import type { CollectionConfig } from "payload"
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished"
import { isAdmin } from "@/access/isAdmin" // Ensure isAdmin is imported
import { Archive } from "@/blocks/ArchiveBlock/config"
import { CallToAction } from "@/blocks/CallToAction/config"
import { Content } from "@/blocks/Content/config"
import { BookTiles } from "@/blocks/BookTiles/config"
import { FormBlock } from "@/blocks/Form/config"
import { MediaBlock } from "@/blocks/MediaBlock/config"
import { BookSigning } from "@/blocks/BooksSigning/config"
import { Newsletter } from "@/blocks/Newsletter/config"
import { AboutAuthor } from "@/blocks/AboutAuthor/config"
import { Testimonials } from "@/blocks/Testimonials/config"
import { hero } from "@/heros/config"
import { slugField } from "@/fields/slug"
import { populatePublishedAt } from "@/hooks/populatePublishedAt"
import { generatePreviewPath } from "@/utilities/generatePreviewPath"
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage"

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"

export const Pages: CollectionConfig<"pages"> = {
  slug: "pages",
  access: {
    create: isAdmin, // Only super-admins can create pages
    delete: isAdmin, // Only super-admins can delete pages
    read: authenticatedOrPublished, // Public can read published, authenticated can read all
    update: isAdmin, // Only super-admins can update pages
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "pages",
          req,
        })
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "pages",
        req,
      }),
    useAsTitle: "title",
    hidden: ({ user }) => user?.roles === "editor", // Hide from editors
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
      admin: {
        description: "This is the title of the page.",
      },
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [hero],
          label: "Hero",
        },
        {
          fields: [
            {
              name: "layout",
              type: "blocks",
              blocks: [
                CallToAction,
                Content,
                MediaBlock,
                Archive,
                FormBlock,
                BookTiles,
                BookSigning,
                AboutAuthor,
                Testimonials,
                Newsletter,
              ],
              required: true,
              admin: {
                initCollapsed: true,
              },
            },
          ],
          label: "Content",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),

            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        position: "sidebar",
      },
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePage],
    beforeChange: [populatePublishedAt],
    afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 100, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
}
