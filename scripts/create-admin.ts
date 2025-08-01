import "dotenv/config" // Add this line at the very top
import { getPayload } from "payload"
import configPromise from "@payload-config"

const createAdminUser = async () => {
  const payload = await getPayload({ config: configPromise })

  try {
    const email = "victormusara@gmail.com"
    const password = "123456"
    const name = "123456"

    const existingUsers = await payload.find({
      collection: "users",
      where: {
        email: {
          equals: email,
        },
      },
      limit: 1,
      overrideAccess: true, // Bypass access control to check for existing users
    })

    if (existingUsers.docs.length > 0) {
      console.log(`User with email ${email} already exists. Skipping creation.`)
      return
    }

    // Create the new super-admin user
    const newUser = await payload.create({
      collection: "users",
      data: {
        email,
        password,
        name,
        roles: "super-admin",
        // Avatar is now optional, so we don't need to provide it here.
        // You can add it via the admin UI after logging in.
      },
      overrideAccess: true, // Bypass access control to create the user
    })

    console.log("New super-admin user created successfully:")
    console.log(`Email: ${newUser.email}`)
    console.log(`Name: ${newUser.name}`)
    console.log(`Roles: ${newUser.roles}`)
  } catch (error) {
    console.error("Error creating super-admin user:", error)
  } finally {
    // It's good practice to close the database connection if the script is a standalone process
    // await payload.disconnect(); // Uncomment if running as a standalone script that needs to disconnect
  }
}

createAdminUser()
