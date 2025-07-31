import type { CollectionAfterChangeHook } from 'payload'
import {
  generateAdminEmailTemplate,
  generateUserEmailTemplate,
  formatSubmissionDate
} from './emailTemplates'

export const afterChangeHook: CollectionAfterChangeHook = async ({
                                                                   req,
                                                                   collection,
                                                                   doc,
                                                                   previousDoc,
                                                                   operation
                                                                 }) => {
  console.log("🔄 After change hook triggered for collection:", collection.slug)
  console.log("📄 Document ID:", doc.id)
  console.log("🔧 Operation:", operation)
  console.log("📋 Previous Document ID:", previousDoc?.id)

  // Only run on create operations (new submissions)
  if (operation !== "create") {
    console.log("ℹ️  Skipping email send - not a new submission (operation:", operation, ")")
    return doc
  }

  const { form, submissionData } = doc

  console.log("📧 Processing form submission emails for:", doc.id)
  console.log("📋 Form ID:", form)
  console.log("📝 Submission data:", submissionData)

  try {
    // Ensure form is a string ID, not an object
    const formId = typeof form === "string" ? form : form?.id || form

    if (!formId || typeof formId !== "string") {
      console.error("❌ Invalid form ID:", JSON.stringify(form))
      return doc
    }

    console.log("🔍 Looking up form with ID:", formId)

    // Get the form data to access form details
    const formDoc = await req.payload.findByID({
      collection: "forms",
      id: formId,
    })

    console.log("📄 Form document found:", formDoc.title)

    // Check if submissionData exists and is an array
    if (!submissionData || !Array.isArray(submissionData)) {
      console.warn("⚠️ Invalid or missing submission data:", submissionData)
      return doc
    }

    // Prepare email template data
    const emailData = {
      formTitle: formDoc.title || "Contact Form",
      formId,
      submissionId: doc.id,
      submissionData,
      submissionDate: formatSubmissionDate(),
    }

    // 📨 Send notification to admin
    console.log("📤 Sending admin notification...")

    await req.payload.sendEmail({
      to: "nicole.k@nicolepoetry.com",
      subject: `📬 New Form Submission — ${emailData.formTitle}`,
      html: generateAdminEmailTemplate(emailData),
    })

    console.log("✅ Admin notification sent successfully")

    // 📨 Send confirmation to user (if email field exists)
    const emailField = submissionData.find(({ field }: { field: string }) =>
      field.toLowerCase().includes("email") || field === "email"
    )

    if (emailField?.value && typeof emailField.value === "string" && emailField.value.includes("@")) {
      console.log("📤 Sending user confirmation to:", emailField.value)

      await req.payload.sendEmail({
        to: emailField.value,
        subject: "✅ Message received — Thank you for reaching out!",
        html: generateUserEmailTemplate(emailData),
      })

      console.log("✅ User confirmation sent successfully")
    } else {
      console.log("ℹ️  No valid email field found in submission, skipping user confirmation")
      console.log("📋 Available fields:", submissionData.map(({ field }) => field).join(", "))
    }

    console.log("🎉 All form submission emails processed successfully")
  } catch (error) {
    console.error("❌ Error sending form submission emails:", error)

    // Log detailed error information
    if (error instanceof Error) {
      console.error("❌ Error details:", {
        name: error.name,
        message: error.message,
        stack: error.stack?.split('\n').slice(0, 5).join('\n') // First 5 lines of stack
      })
    }

    // Don't throw error to prevent form submission from failing
    // The submission will still be saved even if emails fail
  }

  return doc
}
