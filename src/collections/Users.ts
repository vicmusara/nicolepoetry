import type { CollectionConfig } from "payload"

import { authenticated } from "@/access/authenticated"
import { canChangeRoles } from "@/access/canChangeRoles"
import { canAccessAdmin } from "@/access/canAccessAdmin" // Import the new access function

export const Users: CollectionConfig = {
  slug: "users",
  access: {
    admin: canAccessAdmin, // Changed to use canAccessAdmin
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  admin: {
    defaultColumns: ["name", "email", "roles"],
    useAsTitle: "name",
    hidden: ({ user }) => user?.roles === "editor", // Hide from editors
  },
  auth: true,
  fields: [
    {
      name: "name",
      type: "text",
      required: true,
    },
    {
      name: "avatar",
      type: "upload",
      relationTo: "media",
      required: false, // TEMPORARILY SET TO FALSE TO ALLOW ADMIN CREATION
    },
    {
      name: "roles",
      type: "select",
      hasMany: false,
      defaultValue: "editor",
      options: [
        {
          label: "Super Admin",
          value: "super-admin",
        },
        {
          label: "Editor",
          value: "editor",
        },
      ],
      required: true,
      // Only super-admins can change roles
      access: {
        create: canChangeRoles,
        update: canChangeRoles,
      },
    },
  ],
  timestamps: true,
}
