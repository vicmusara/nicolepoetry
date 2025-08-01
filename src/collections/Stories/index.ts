import type { CollectionConfig } from "payload"

import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical"

import { authenticated } from "@/access/authenticated"
import { authenticatedOrPublished } from "@/access/authenticatedOrPublished"
import { isAdmin } from "@/access/isAdmin"
import { canManageOwnStories } from "@/access/canManageOwnStories"
import { Banner } from "@/blocks/Banner/config"
import { Code } from "@/blocks/Code/config"
import { MediaBlock } from "@/blocks/MediaBlock/config"
import { RelatedStories } from "@/blocks/RelatedStories/config"
import { generatePreviewPath } from "@/utilities/generatePreviewPath"
import { populateAuthors } from "./hooks/populateAuthors"
import { revalidateDelete, revalidatePost } from "./hooks/revalidatePost"

import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields"
import { slugField } from "@/fields/slug"
import { populateAuthor } from "./hooks/populateAuthor"

export const Stories: CollectionConfig<"stories"> = {
  slug: "stories",
  access: {
    create: authenticated, // Anyone authenticated can create
    read: authenticatedOrPublished, // Public can read published, authenticated can read all
    update: canManageOwnStories, // Editors can update their own, super-admins can update all
    delete: isAdmin, // Only super-admins can delete
  },
  // This config controls what's populated by default when a story is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'stories'>
  defaultPopulate: {
    title: true,
    slug: true,
    categories: true,
    populatedAuthors: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt", "author"],
    livePreview: {
      url: ({ data, req }) => {
        return generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "stories",
          req,
        })
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "stories",
        req,
      }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "heroImage",
              type: "upload",
              relationTo: "media",
            },
            {
              name: "content",
              type: "richText",
              editor: lexicalEditor({
                features: ({ rootFeatures }) => {
                  return [
                    ...rootFeatures,
                    HeadingFeature({ enabledHeadingSizes: ["h1", "h2", "h3", "h4"] }),
                    BlocksFeature({ blocks: [Banner, Code, MediaBlock, RelatedStories] }),
                    FixedToolbarFeature(),
                    InlineToolbarFeature(),
                    HorizontalRuleFeature(),
                  ]
                },
              }),
              label: false,
              required: true,
            },
          ],
          label: "Content",
        },
        {
          fields: [
            {
              name: "relatedStories",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                }
              },
              hasMany: true,
              relationTo: "stories",
            },
            {
              name: "categories",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              hasMany: true,
              relationTo: "categories",
            },
          ],
          label: "Meta",
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
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date()
            }
            return value
          },
        ],
      },
    },
    {
      name: "authors",
      type: "relationship",
      hasMany: true,
      relationTo: ["users"], // Changed from ['users', 'writers']
      required: false,
      admin: {
        position: "sidebar",
      },
    },
    {
      name: "author",
      type: "relationship",
      relationTo: "users",
      required: true,
      defaultValue: ({ user }) => user?.id, // Automatically set the author to the current user
      admin: {
        position: "sidebar",
        readOnly: true, // Prevent manual changes to author
        hidden: true, // Hide from admin UI
      },
      hooks: {
        beforeChange: [populateAuthor],
      },
    },

    // This field is only used to populate the user data via the `populateAuthors` hook
    // This is because the `user` collection has access control locked to protect user privacy
    // GraphQL will also not return mutated user data that differs from the underlying schema
    {
      name: "populatedAuthors",
      type: "array",
      access: {
        update: () => false,
      },
      admin: {
        disabled: true,
        readOnly: true,
      },
      fields: [
        {
          name: "id",
          type: "text",
        },
        {
          name: "name",
          type: "text",
        },
        {
          name: "avatar",
          type: "text",
        },
      ],
    },
    ...slugField(),
  ],
  hooks: {
    afterChange: [revalidatePost],
    afterRead: [populateAuthors],
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
