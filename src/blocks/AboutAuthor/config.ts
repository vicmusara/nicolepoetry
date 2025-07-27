import { Block } from 'payload';

export const AboutAuthor: Block = {
  slug: 'aboutAuthor',
  interfaceName: 'AboutAuthorBlock',
  labels: {
    singular: 'About Author',
    plural: 'About Author Sections',
  },
  
  fields: [
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      label: 'Author Image',
      required: true,
      admin: {
        description: 'Upload an image of the author.',
      },
    },
    {
      name: 'highlightText',
      type: 'text',
      label: 'Highlight Text',
      defaultValue: 'The story of',
      admin: {
        description: 'This is the hight text above author name that will be displayed in the about author section.',
      },
    },
    {
      name: 'authorName',
      type: 'text',
      label: 'Author Name',
      defaultValue: 'Nicole Kazembe',
      required: true,
      admin: {
        description: 'This is the name of the author.',
      },
    },
    {
      name: 'bio',
      type: 'richText',
      label: 'Short Bio (Paragraphs)',
      admin: {
        description: 'This is the short bio of the author.',
      },
    },
    {
      name: 'readMoreLabel',
      type: 'text',
      label: 'Read More Button Label',
      defaultValue: 'Read More',
      admin: {
        description: 'This is the label of the read more button to redirect readers to a section or site where they can read more about the author.',
      },
    },
    {
      name: 'readMoreLink',
      type: 'text',
      label: 'Read More Link',
      defaultValue: '#',
      admin: {
        description: 'This is the link of the read more button to redirect readers to a section or site where they can read more about the author.',
      },
    },
    {
      name: 'booksPublished',
      type: 'number',
      label: 'Books Published',
      admin: {
        description: 'This is the number of books published by the author.',
      },
    },
    {
      name: 'awardWinningBooks',
      type: 'number',
      label: 'Award Winning Books',
      admin: {
        description: 'This is the number of award winning books by the author.',
      },
    },
  ],
};
