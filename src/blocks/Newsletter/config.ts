import { Block } from 'payload'

export const Newsletter: Block = {
  slug: 'newsletter',
  interfaceName: 'NewsletterBlock',
  labels: {
    singular: 'Newsletter',
    plural: 'Newsletter Sections',
  },
  fields: [
    {
      name: 'heading',
      label: 'Heading',
      type: 'text',
      required: true,
      defaultValue: 'Get all the latest news and info sent to your inbox.',
    },
    {
      name: 'buttonLabel',
      label: 'Button Label',
      type: 'text',
      required: true,
      defaultValue: 'Subscribe',
    },
  ],
}
