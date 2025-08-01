import Image from "next/image"
import classes from "./index.module.css" // Import the CSS module

export const Icon = () => (
  <div className={classes.adminIconContainer}>
    <Image
      src="/android-chrome-512x512.png"
      alt="Admin Icon"
      fill // Use fill to make the image fill its parent
      sizes="16px" // Specify the size for optimization
      className={classes.adminIconImage} // Apply the new CSS module class
    />
  </div>
)