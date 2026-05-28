import { NextRequest, NextResponse } from 'next/server'
import { checkRateLimit } from '@/lib/rateLimit'
import { sendConfirmationEmails, sendConsultingConfirmation } from '@/lib/email'
import { TIME_SLOTS } from '@/data/calendar'

const ALLOWED_SLOTS = new Set(TIME_SLOTS)
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export async function POST(request: NextRequest) {
  const ip =
    request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    'unknown'

  const { allowed } = checkRateLimit(ip)
  if (!allowed) {
    return NextResponse.json({ error: 'rate_limited' }, { status: 429 })
  }

  let body: Record<string, unknown>
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
  }

  const { email, day, month, year, time, plan, source } = body as {
    email?: string
    day?: number
    month?: number
    year?: number
    time?: string
    plan?: string
    source?: string
  }

  if (!email || typeof email !== 'string' || !EMAIL_REGEX.test(email)) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
  }

  if (
    typeof day !== 'number' ||
    typeof month !== 'number' ||
    typeof year !== 'number' ||
    !Number.isInteger(day) ||
    !Number.isInteger(month) ||
    !Number.isInteger(year)
  ) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
  }

  const sanitizedEmail = email.trim().replace(/<[^>]*>/g, '')
  const sanitizedPlan = plan
    ? plan.trim().replace(/<[^>]*>/g, '').slice(0, 50)
    : undefined

  const date = new Date(year, month, day)
  const today = new Date()
  today.setHours(23, 59, 59, 999)
  if (date <= today) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
  }

  if (!time || typeof time !== 'string' || !ALLOWED_SLOTS.has(time)) {
    return NextResponse.json({ error: 'invalid_input' }, { status: 400 })
  }

  try {
    if (source === 'consulting') {
      await sendConsultingConfirmation({
        email: sanitizedEmail,
        day,
        month,
        year,
        time,
      })
    } else {
      await sendConfirmationEmails({
        email: sanitizedEmail,
        day,
        month,
        year,
        time,
        plan: sanitizedPlan,
      })
    }

    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'mail_error' }, { status: 500 })
  }
}
