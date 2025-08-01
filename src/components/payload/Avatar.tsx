import { Media } from "@/components/Media"
import type { Media as MediaType, User } from "@/payload-types"
import type React from "react"

import classes from "./index.module.css"

type Props = {
  user: User
}

export const Avatar: React.FC<Props> = ({ user }) => {
  const avatarResource =
    typeof user.avatar === "object" && user.avatar !== null ? (user.avatar as MediaType) : undefined

  if (!avatarResource || !avatarResource.url) {
    // Fallback: Render user's initial if no avatar URL is available
    const initial = user.name ? user.name.charAt(0).toUpperCase() : "U"
    return <div className={classes.avatarFallback}>{initial}</div>
  }

  return (
    <div className={classes.avatarContainer}>
      <Media
        resource={{ ...avatarResource, alt: avatarResource?.alt ?? "" }}
        imgClassName={classes.avatarImage} // Apply CSS module class
        priority
      />
    </div>
  )
}
