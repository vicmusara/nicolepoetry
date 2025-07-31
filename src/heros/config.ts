import type { Field } from 'payload'

import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
  InlineCodeFeature, HorizontalRuleFeature,
} from '@payloadcms/richtext-lexical'

import { linkGroup } from '@/fields/linkGroup'

export const hero: Field = {
  name: 'hero',
  type: 'group',
  fields: [
    {
      name: 'type',
      type: 'select',
      defaultValue: 'homeHero',
      admin: {
        description: 'Select the type of hero to display on the page. Home Hero is suitable for' +
          ' the homepage, while Medium Hero and Low Impact are designed for other pages.',
      },
      label: 'Type',
      options: [
        {
          label: 'None',
          value: 'none',
        },
        {
          label: 'Home Hero',
          value: 'homeHero',
        },
        {
          label: 'Medium Impact',
          value: 'mediumImpact',
        },
        {
          label: 'Low Impact',
          value: 'lowImpact',
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
        condition: (_, { type } = {}) => ['homeHero', 'mediumImpact', 'lowImpact'].includes(type),
      },
      relationTo: 'media',
      required: true,
    },
    {
      name: 'featuredLogos',
      type: 'array',
      admin: {
        condition: (_, { type } = {}) => ['homeHero'].includes(type),
      },
      fields: [
        {
          name: 'logo',
          type: 'upload',
          relationTo: 'media',
          required: true,
          admin: {
            description: 'Upload a logo associated with event, interview...or anywhere you have' +
              ' been featured and a link to the platform website.',
          },
        },
        {
          name: 'link',
          type: 'text',
          hasMany: false,
          required: true,
          admin: {
            description: 'Link to the platform where you got featured.',
          },
        },
        {
          name: 'caption',
          type: 'richText',
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
              return [...rootFeatures, FixedToolbarFeature(), InlineToolbarFeature(), LinkFeature(), HorizontalRuleFeature(),]
            },
          }),
          admin: {
            description: 'Caption for the logo describing the event, interview...or wherever you' +
              ' got featured.',
          },
        }
      ],
      label: 'Featured Logos',
      maxRows: 5,
    },
  ],
  label: false,
}