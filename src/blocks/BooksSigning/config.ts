
import { Block } from 'payload'

export const BookSigning: Block = {
  slug: 'bookSigning',
  interfaceName: 'BookSigningBlock',
  labels: {
    singular: 'Book Signing',
    plural: 'Book Signing Sections',
  },
  fields: [
    {
      name: 'highlightText',
      type: 'text',
      label: 'Highlight Text',
      defaultValue: "Don't miss it!",
      admin: {
        description: 'This is the highlight text above the title.',
      },
    },
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      defaultValue: 'Get a special copy signed by me',
      admin: {
        description: 'This is the call for action text above the title.',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      label: 'Description',
      defaultValue:
        'Duis quis euismod facilisis nunc arcu, diam non aliquet eget imperdiet maecenas blandit vitae laoreet tincidunt sociis proin massa pulvinar.',
      admin: {
        description: 'This is the description of the book signing event.',
      },
    },
    {
      name: 'eventDate',
      type: 'date',
      label: 'Event Date',
      admin: { date: { pickerAppearance: 'dayAndTime' } },
      required: true,
    },
    {
      name: 'location',
      type: 'text',
      label: 'Location',
      required: true,
      defaultValue: '1234 N Spring St, Los Angeles, CA 90012, United States.',
      admin: {
        description: 'This is the location of the book signing event.',
      },
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Button Text',
      defaultValue: 'Get Tickets To The Event',
      admin: {
        description: 'This is the text of the button to redirect readers to book the event.',
      },
    },
    {
      name: 'buttonLink',
      type: 'text',
      label: 'Button Link',
      defaultValue: '#',
      admin: {
        description: 'This is the link of the button to redirect readers to book the event.',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Image',
      required: true,
      admin: {
        description: 'This is the image of the book signing event.',
      },
    },
  ],
};
