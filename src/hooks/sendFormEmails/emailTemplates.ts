// Email template utilities with responsive design and Tailwind-like styling

interface SubmissionData {
  field: string;
  value: unknown;
}

interface EmailTemplateData {
  formTitle: string;
  formId: string;
  submissionId: string;
  submissionData: SubmissionData[];
  submissionDate: string;
}

// Base CSS that mimics Tailwind classes with your theme colors
const getBaseStyles = () => `
  <style>
    @media only screen and (max-width: 600px) {
      .mobile-full { width: 100% !important; }
      .mobile-stack { display: block !important; width: 100% !important; }
      .mobile-stack td { display: block !important; width: 100% !important; padding: 8px 12px !important; }
      .mobile-stack .field-label { 
        font-weight: 600 !important; 
        color: #374151 !important; 
        border-bottom: none !important;
        padding-bottom: 4px !important;
      }
      .mobile-stack .field-value { 
        color: #1f2937 !important; 
        padding-top: 0 !important;
        border-bottom: 1px solid #e5e7eb !important;
        padding-bottom: 12px !important;
        margin-bottom: 8px !important;
      }
      .mobile-padding { padding: 16px !important; }
      .mobile-text-sm { font-size: 14px !important; }
    }
    
    /* Theme colors matching your global.css */
    .bg-background { background-color: oklch(0.141 0.005 285.823); }
    .bg-card { background-color: oklch(0.21 0.006 285.885); }
    .bg-primary { background-color: oklch(0.696 0.17 162.48); }
    .bg-muted { background-color: oklch(0.274 0.006 286.033); }
    .text-foreground { color: oklch(0.985 0 0); }
    .text-primary { color: oklch(0.696 0.17 162.48); }
    .text-muted-foreground { color: oklch(0.705 0.015 286.067); }
    .border-border { border-color: oklch(1 0 0 / 10%); }
  </style>
`;

// Generate responsive submission data table
export const generateSubmissionTable = (submissionData: SubmissionData[]): string => {
  const rows = submissionData
    .map(({ field, value }) => {
      const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1');
      const fieldValue = Array.isArray(value) ? value.join(", ") : String(value || "N/A");

      return `
        <tr class="mobile-stack">
          <td class="field-label" style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; font-weight: 600; color: #374151; width: 140px; vertical-align: top;">
            ${fieldName}:
          </td>
          <td class="field-value" style="padding: 12px 16px; border-bottom: 1px solid #e5e7eb; color: #1f2937; word-break: break-word;">
            ${fieldValue}
          </td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="overflow-x: auto; margin-bottom: 32px;">
      <table class="mobile-full" style="width: 100%; border-collapse: collapse; background: #f8fafc; border-radius: 8px; overflow: hidden;">
        ${rows}
      </table>
    </div>
  `;
};

// Admin notification email template
export const generateAdminEmailTemplate = (data: EmailTemplateData): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>New Form Submission</title>
      ${getBaseStyles()}
    </head>
    <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; line-height: 1.6;">
      <div class="mobile-full" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, oklch(0.696 0.17 162.48) 0%, #764ba2 100%); padding: 32px; text-align: center;" class="mobile-padding">
          <h1 style="color: oklch(0.985 0 0); margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;" class="mobile-text-sm">
            📬 New Form Submission
          </h1>
          <p style="color: rgba(255,255,255,0.9); margin: 12px 0 0 0; font-size: 18px; font-weight: 500;" class="mobile-text-sm">
            ${data.formTitle}
          </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px;" class="mobile-padding">
          <h2 style="color: #1f2937; margin: 0 0 24px 0; font-size: 20px; font-weight: 600;">Submission Details</h2>
          
          ${generateSubmissionTable(data.submissionData)}
          
          <!-- Metadata -->
          <div style="background: #f0f9ff; padding: 24px; border-radius: 8px; border-left: 4px solid oklch(0.696 0.17 162.48);" class="mobile-padding">
            <h3 style="color: #0c4a6e; margin: 0 0 16px 0; font-size: 16px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em;">
              📊 Submission Info
            </h3>
            <div style="margin-bottom: 8px;">
              <p style="margin: 8px 0; font-size: 14px; color: #374151;">
                <strong style="color: #1f2937;">📅 Submitted:</strong> ${data.submissionDate}
              </p>
              <p style="margin: 8px 0; font-size: 14px; color: #374151;">
                <strong style="color: #1f2937;">🆔 Form ID:</strong> 
                <code style="background: oklch(0.274 0.006 286.033); color: oklch(0.985 0 0); padding: 2px 6px; border-radius: 4px; font-family: 'Monaco', 'Menlo', monospace;">${data.formId}</code>
              </p>
              <p style="margin: 8px 0; font-size: 14px; color: #374151;">
                <strong style="color: #1f2937;">📧 Submission ID:</strong> 
                <code style="background: oklch(0.274 0.006 286.033); color: oklch(0.985 0 0); padding: 2px 6px; border-radius: 4px; font-family: 'Monaco', 'Menlo', monospace;">${data.submissionId}</code>
              </p>
            </div>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8fafc; padding: 24px; text-align: center; border-top: 1px solid #e5e7eb;" class="mobile-padding">
          <p style="margin: 0; font-size: 13px; color: #6b7280;">
            This email was automatically generated by your website's contact form system.
          </p>
          <a style="margin: 8px 0 0 0; font-size: 12px; color: #9ca3af;" href='nicolepoetry.com' target="_blank" rel="noopener noreferrer">
            &copy;Nicole Poetry 
          </a> <span>${new Date().getFullYear()}</span>
        </div>
      </div>
    </body>
    </html>
  `;
};

// User confirmation email template
export const generateUserEmailTemplate = (data: EmailTemplateData): string => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Message Received</title>
      ${getBaseStyles()}
    </head>
    <body style="margin: 0; padding: 20px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f9fafb; line-height: 1.6;">
      <div class="mobile-full" style="max-width: 600px; margin: 0 auto; background: white; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);">
        
        <!-- Header -->
        <div style="background: linear-gradient(135deg, oklch(0.696 0.17 162.48) 0%, #059669 100%); padding: 32px; text-align: center;" class="mobile-padding">
          <h1 style="color: oklch(0.985 0 0); margin: 0; font-size: 28px; font-weight: 700; letter-spacing: -0.025em;" class="mobile-text-sm">
            Nicole Poetry
          </h1>
          <p style="color: rgba(255,255,255,0.95); margin: 12px 0 0 0; font-size: 18px; font-weight: 500;" class="mobile-text-sm">
            Thank you for getting in touch ✨
          </p>
        </div>
        
        <!-- Content -->
        <div style="padding: 32px;" class="mobile-padding">
          <h2 style="color: #1f2937; margin: 0 0 20px 0; font-size: 22px; font-weight: 600;">Hi there! 👋</h2>
          
          <p style="color: #4b5563; line-height: 1.7; margin-bottom: 24px; font-size: 16px;">
            Thank you for reaching out! I've received your message and truly appreciate you taking the time to get in touch. 
            Your inquiry is important to me, and I'll get back to you as soon as possible.
          </p>
          
          <div style="background: #f0fdf4; padding: 24px; border-radius: 8px; border-left: 4px solid oklch(0.696 0.17 162.48); margin: 24px 0;" class="mobile-padding">
            <h3 style="color: #15803d; margin: 0 0 16px 0; font-size: 16px; font-weight: 600;">
              📝 Your Message Summary
            </h3>
            ${generateSubmissionTable(data.submissionData)}
          </div>
          
          <div style="background: #eff6ff; padding: 20px; border-radius: 8px; margin: 24px 0;" class="mobile-padding">
            <h4 style="color: oklch(0.696 0.17 162.48); margin: 0 0 12px 0; font-size: 16px; font-weight: 600;">
              ⏰ What happens next?
            </h4>
            <ul style="color: #374151; margin: 0; padding-left: 20px; font-size: 15px;">
              <li style="margin-bottom: 8px;">I typically respond within <strong>24-48 hours</strong> during business days</li>
              <li style="margin-bottom: 8px;">For urgent inquiries, I'll prioritize getting back to you sooner</li>
              <li>Keep this email for your records and reference submission ID below if needed</li>
            </ul>
          </div>
          
          <div style="background: #fef3c7; padding: 16px; border-radius: 6px; margin: 20px 0;" class="mobile-padding">
            <p style="margin: 0; font-size: 14px; color: #92400e;">
              💡 <strong>Reference ID:</strong> 
              <code style="background: rgba(0,0,0,0.1); padding: 2px 6px; border-radius: 4px; font-family: 'Monaco', 'Menlo', monospace;">${data.submissionId}</code>
            </p>
          </div>
        </div>
        
        <!-- Footer -->
        <div style="background: #f8fafc; padding: 24px; border-top: 1px solid #e5e7eb;" class="mobile-padding">
          <div style="text-align: center;">
            <p style="margin: 0 0 12px 0; color: #1f2937; font-size: 16px; font-weight: 500;">
              Warm regards,<br/>
              <span style="font-size: 18px; font-weight: 600; color: oklch(0.696 0.17 162.48);">Nicole</span> ✨
            </p>
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">
              This is an automated confirmation. Please don't reply directly to this email.
            </p>
          </div>
        </div>
      </div>
    </body>
    </html>
  `;
};

// Helper function to format date
export const formatSubmissionDate = (): string => {
  return new Date().toLocaleString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZoneName: "short",
  });
};