import type { Block } from 'payload'

export const BookTiles: Block = {
  slug: 'bookTiles',
  interfaceName: 'BooksTilesBlock',
  labels: {
    singular: 'Best Selling Books',
    plural: 'Best Selling Books',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Section Title',
      defaultValue: 'Best selling books',
      admin: {
        description: 'This is the title of the section. You can leave it as Best Selling Books or change it to something else.',
      },
    },
    {
      name: 'viewAllLink',
      type: 'text',
      label: 'View All Books Link',
      required: false,
      admin: {
        description: 'This is the link to redirect readers to the all books page.',
      },
    },
    {
      name: 'books',
      type: 'array',
      label: 'Books',
      minRows: 1,
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          label: 'Book Cover',
          required: true,
          admin: {
            description: 'This is where you upload the book cover image (preferably in webp format).',
          },
        },
        {
          name: 'title',
          type: 'text',
          label: 'Book Title',
          required: true,
          admin: {
            description: 'This is the title of the book.',
          },
        },
        {
          name: 'orderLink',
          type: 'text',
          label: 'Order Link',
          required: true,
          admin: {
            description: 'This is the link to redirect readers to the book order page.',
          },
        },
      ],
    },
  ],
};
