import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineCodeFeature,
  InlineToolbarFeature,
  lexicalEditor,
  LinkFeature,
} from '@payloadcms/richtext-lexical'
import { Block } from 'payload'

export const Testimonials: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  labels: {
    singular: 'Testimonial',
    plural: 'Testimonials',
  },
  fields: [
    {
      name: 'backgroundImage',
      type: 'upload',
      relationTo: 'media',
      label: 'Background Image',
      required: true,
      admin: {
        description: 'This is the background image of the testimonial block.',
      },
    },
    {
      name: 'testimonials',
      type: 'array',
      label: 'Testimonials',
      admin: {
        description:
          'Here you enter the testimonials/reviews that will be displayed in the testimonial block. You can add as many testimonials as you want.',
      },
      minRows: 1,
      fields: [
        {
          admin: {
            description:
              'Enter an excerpt of the review. This will be displayed in the testimonial block.',
          },
          name: 'quote',
          type: 'richText',
          required: true,
          editor: lexicalEditor({
            features: ({ rootFeatures }) => [
              ...rootFeatures,
              HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4'] }),
              FixedToolbarFeature(),
              InlineToolbarFeature(),
              LinkFeature(),
              InlineCodeFeature(),
            ],
          }),
          label: 'Quote',
        },
        {
          name: 'signature',
          type: 'upload',
          relationTo: 'media',
          label: 'Signature Image',
          admin: {
            description:
              'Upload a transparent background svg of the signature of the person who gave the review.',
          },
        },
        {
          name: 'reviewer',
          type: 'text',
          label: 'Reviewer',
          admin: {
            description: 'Enter the name of the person who is giving the review.',
          },
          required: true,
        },
        {
          name: 'reviewedBook',
          type: 'text',
          label: 'Reviewed Book Title',
          admin: {
            description:
              'Enter the title of the book this testimonial is about. If the testimonial is not about a book, leave this blank.',
          },
          required: false,
        },
        {
          name: 'bookOrderLink',
          type: 'text',
          label: 'Book Order Link',
          admin: {
            description:
              'Enter the order link for the book this testimonial is about. If the testimonial is not about a book, leave this blank.',
          },
          required: false,
        },
      ],
    },
  ],
}
