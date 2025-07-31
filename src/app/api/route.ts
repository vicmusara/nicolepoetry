// app/api/form-submissions/route.ts
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export async function POST(request: Request) {
  const payload = await getPayload({ config: configPromise })

  try {
    const body = await request.json()

    const result = await payload.create({
      collection: 'form-submissions',
      data: body,
    })

    return Response.json(result)
  } catch (error) {
    console.error('Form submission error:', error)
    return Response.json(
      { error: 'Form submission failed' },
      { status: 500 }
    )
  }
}