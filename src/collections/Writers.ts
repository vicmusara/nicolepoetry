import type { CollectionConfig } from 'payload'

import { authenticated } from '@/access/authenticated'

export const Writers: CollectionConfig = {
  slug: 'writers',
  auth: true,
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'email'],
  },
  access: {
    admin: authenticated,
    create: authenticated,
    read: authenticated,
    update: authenticated,
    delete: authenticated,
  },
  fields: [
    {
      name: 'name',
      label: 'Full Name',
      type: 'text',
      required: true,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
  ],
  timestamps: true,
}
