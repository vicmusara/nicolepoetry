import type { Access } from 'payload'

export const isOwnWriter: Access = ({ req }) => {
  const user = req.user as { id: string; collection: 'writers' | 'users' }

  if (!user || user.collection !== 'writers') return false

  return {
    authors: {
      contains: user.id,
    },
  }
}
