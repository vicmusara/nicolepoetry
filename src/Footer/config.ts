import type { GlobalConfig } from 'payload'

import { link } from '@/fields/link'
import { revalidateFooter } from './hooks/revalidateFooter'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'navItems',
      label: 'Navigation Links',
      labels: {
        singular: 'Nav Item',
        plural: 'Nav Items',
      },
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
      fields: [link()],
    },
    {
      name: 'socialLinks',
      label: 'Social Links',
      labels: {
        singular: 'Social Link',
        plural: 'Social Links',
      },
      type: 'array',
      admin: {
        components: {
          RowLabel: '@/Header/RowLabel#RowLabel',
        },
      },
      fields: [
        {
          name: 'platform',
          label: 'Platform',
          type: 'select',
          required: true,
          options: [
            { label: 'TikTok', value: 'tiktok' },
            { label: 'YouTube', value: 'youtube' },
            { label: 'Facebook', value: 'facebook' },
            { label: 'Instagram', value: 'instagram' },
          ],
        },
        {
          name: 'url',
          label: 'URL',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'copyrightText',
      label: 'Copyright Text',
      type: 'text',
      required: false,
      defaultValue: 'Bestselling Author',
    },
  ],
  hooks: {
    afterChange: [revalidateFooter],
  },
}
