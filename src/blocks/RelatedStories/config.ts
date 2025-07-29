import type { Block } from 'payload'
import {
  lexicalEditor,
  HeadingFeature,
  InlineToolbarFeature,
  FixedToolbarFeature,
} from '@payloadcms/richtext-lexical'

export const RelatedStories: Block = {
  slug: 'relatedStories',
  interfaceName: 'RelatedStoriesBlock',
  fields: [
    {
      name: 'introContent',
      type: 'richText',
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ['h2', 'h3', 'h4'] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ]
        },
      }),
    },
    {
      name: 'docs',
      type: 'relationship',
      relationTo: 'stories',
      hasMany: true,
    },
  ],
}
