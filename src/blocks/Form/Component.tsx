"use client"
import type { Form as FormType } from "@payloadcms/plugin-form-builder/types"

import { useRouter } from "next/navigation"
import type React from "react"
import { useCallback, useState } from "react"
import { useForm, FormProvider } from "react-hook-form"
import { CheckCircle, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import type { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical"

import { fields } from "./fields"
import { Button } from '@/components/ui/button'
import RichText from '@/components/RichText'

export type FormBlockType = {
  blockName?: string
  blockType?: "formBlock"
  enableIntro: boolean
  form: FormType
  introContent?: SerializedEditorState
}

export const FormBlock: React.FC<
  {
    id?: string
  } & FormBlockType
> = (props) => {
  const {
    enableIntro,
    form: formFromProps,
    form: { id: formID, confirmationMessage, confirmationType, redirect, submitButtonLabel } = {},
    introContent,
  } = props

  const formMethods = useForm({
    defaultValues: formFromProps.fields.reduce(
      (acc, field) => {
        // Assert that 'field' has a 'name' property
        acc[(field as { name: string }).name] = ""
        return acc
      },
      {} as Record<string, unknown>,
    ),
  })
  const {
    control,
    formState: { errors },
    handleSubmit,
    register,
  } = formMethods

  const [isLoading, setIsLoading] = useState(false)
  const [hasSubmitted, setHasSubmitted] = useState<boolean>()
  const [error, setError] = useState<{ message: string; status?: string } | undefined>()
  const router = useRouter()

  const onSubmit = useCallback(
    (data: Record<string, unknown>) => {
      let loadingTimerID: ReturnType<typeof setTimeout>
      const submitForm = async () => {
        setError(undefined)

        // Format the data as expected by PayloadCMS Form Builder
        const dataToSend = Object.entries(data).map(([name, value]) => ({
          field: name,
          value,
        }))

        // delay loading indicator by 1s
        loadingTimerID = setTimeout(() => {
          setIsLoading(true)
        }, 1000)

        try {
          // Updated endpoint - use the standard form-submissions endpoint
          // Try multiple potential endpoints based on your setup
          const possibleEndpoints = [
            `/api/form-submissions`, // Standard PayloadCMS endpoint
            `/api/payload/form-submissions`, // If using proxy
            `/api/payload/_payload/form-submissions`, // Your current endpoint
          ]

          let response;

          // Try each endpoint until one works
          for (const endpoint of possibleEndpoints) {
            try {
              response = await fetch(endpoint, {
                body: JSON.stringify({
                  form: formID,
                  submissionData: dataToSend,
                }),
                headers: {
                  "Content-Type": "application/json",
                },
                method: "POST",
              })

              if (response.ok) {
                break;
              }
            } catch (_endpointError) {
              console.warn(`Failed to submit to ${endpoint}`)
            }
          }

          if (!response) {
            // noinspection ExceptionCaughtLocallyJS
            throw new Error("No valid endpoint found")
          }

          clearTimeout(loadingTimerID)

          // Handle response
          let res;
          try {
            res = await response.json()
          } catch (_jsonError) {
            // If JSON parsing fails, check if it's still a successful submission
            if (response.ok) {
              setIsLoading(false)
              setHasSubmitted(true)

              if (confirmationType === "redirect" && redirect) {
                const { url } = redirect
                if (url) router.push(url)
              }
              return
            } else {
              setIsLoading(false)
              setError({
                message: "Invalid response format",
                status: response.status.toString(),
              })
              return
            }
          }

          if (!response.ok) {
            setIsLoading(false)

            // Handle different error response formats
            let errorMessage = "Internal Server Error"

            if (res?.errors?.length > 0) {
              errorMessage = res.errors[0].message
            } else if (res?.error) {
              errorMessage = res.error
            } else if (res?.message) {
              errorMessage = res.message
            }

            setError({
              message: errorMessage,
              status: response.status.toString(),
            })

            return
          }

          // Success case
          setIsLoading(false)
          setHasSubmitted(true)

          if (confirmationType === "redirect" && redirect) {
            const { url } = redirect
            if (url) router.push(url)
          }
        } catch (err) {
          console.error("Form submission error:", err)
          clearTimeout(loadingTimerID)
          setIsLoading(false)
          setError({
            message: err instanceof Error ? err.message : "Something went wrong.",
          })
        }
      }

      void submitForm()
    },
    [router, formID, redirect, confirmationType],
  )

  return (
    <div className="max-w-3xl mx-auto">
      {enableIntro && introContent && !hasSubmitted && (
        <RichText className="mb-8 lg:mb-12 text-center" data={introContent} enableGutter={false} />
      )}
      <div className="p-4 lg:p-6 border border-border rounded-[0.8rem]">
        <FormProvider {...formMethods}>
          {!isLoading && hasSubmitted && confirmationType === "message" && (
            <div className="text-center">
              <Alert className="mb-4">
                <CheckCircle className="h-4 w-4" />
                <AlertTitle>Thank you for your submission!</AlertTitle>
                <AlertDescription>
                  We&apos;ve received your message and will get back to you soon.
                </AlertDescription>
              </Alert>
              {confirmationMessage && <RichText data={confirmationMessage} />}
            </div>
          )}
          {isLoading && !hasSubmitted && (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Sending your message...</p>
            </div>
          )}
          {error && (
            <Alert variant="destructive" className="mb-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Submission Failed</AlertTitle>
              <AlertDescription>
                {`${error.status || "500"}: ${error.message || "Please try again later."}`}
              </AlertDescription>
            </Alert>
          )}
          {!hasSubmitted && (
            <form id={formID} onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4 last:mb-0">
                {formFromProps &&
                  formFromProps.fields &&
                  formFromProps.fields?.map((field, index) => {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    const Field: React.FC<any> = fields?.[field.blockType as keyof typeof fields]
                    if (Field) {
                      return (
                        <div className="mb-6 last:mb-0 text-foreground" key={index}>
                          <Field
                            form={formFromProps}
                            {...field}
                            {...formMethods}
                            control={control}
                            errors={errors}
                            register={register}
                          />
                        </div>
                      )
                    }
                    return null
                  })}
              </div>

              <Button form={formID} type="submit" variant="default" disabled={isLoading}>
                {isLoading ? "Sending..." : submitButtonLabel || "Submit"}
              </Button>
            </form>
          )}
        </FormProvider>
      </div>
    </div>
  )
}