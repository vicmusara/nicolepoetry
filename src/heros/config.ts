import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  InlineCodeFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'heroA',
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Hero A',
          value: 'heroA',
        },
        {
          label: 'Hero B',
          value: 'heroB',
        },
        {
          label: 'Hero C',
          value: 'heroC',
        },
      ],
      required: true,
    },
    {
      name: 'subtitle',
      type: 'text',
      admin: {
        condition: (_, { type } = {}) => ['heroA', 'heroB', 'heroC'].includes(type),
      },
      label: 'Subtitle',
    },
    {
      name: 'richText',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            LinkFeature(),
            InlineCodeFeature(),
          ]
        },
      }),
      label: false,
    },
    linkGroup({
      overrides: {
        maxRows: 2,
      },
    }),
    {
      name: 'media',
      type: 'upload',
      admin: {
        condition: (_, { type } = {}) => ['heroA', 'heroB', 'heroC'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featuredLogos',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => ['heroA', 'heroB', 'heroC'].includes(type),
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      label: 'Featured Logos',
      maxRows: 5,
    },
  ],
  label: false,
}