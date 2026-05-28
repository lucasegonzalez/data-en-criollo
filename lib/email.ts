import { Resend } from 'resend'

const MONTH_NAMES = [
  'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
  'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE',
]

function getResend() {
  const key = process.env.RESEND_API_KEY
  if (!key) {
    throw new Error('RESEND_API_KEY is not set')
  }
  return new Resend(key)
}

export async function sendConfirmationEmails(params: {
  email: string
  day: number
  month: number
  year: number
  time: string
  plan?: string
}) {
  const { email, day, month, year, time, plan } = params
  const resend = getResend()
  const monthName = [
    'ENERO', 'FEBRERO', 'MARZO', 'ABRIL', 'MAYO', 'JUNIO',
    'JULIO', 'AGOSTO', 'SEPTIEMBRE', 'OCTUBRE', 'NOVIEMBRE', 'DICIEMBRE',
  ][month]

  const subjectLine = plan
    ? `📅 Consulta — ${plan} · ${day}/${month} ${time}hs`
    : `📅 Consulta · ${day}/${month} ${time}hs`

  const from = process.env.RESEND_FROM!
  const to = process.env.RESEND_TO!

  await Promise.all([
    resend.emails.send({
      from,
      to,
      subject: subjectLine,
      replyTo: email,
      text: `Cliente: ${email}\nFecha: ${day} de ${monthName} de ${year}\nHorario: ${time} hs\nPlan: ${plan ?? '—'}\n──────────────────────────────\nRespondé este mail para confirmar o reprogramar.\nEl cliente ve tu respuesta directamente en su casilla.`,
    }),

    resend.emails.send({
      from,
      to: email,
      subject: 'Tu consulta con Data en Criollo está registrada',
      text: `DATA | en Criollo\n─────────────────────────────────────\nRecibimos tu solicitud para el ${day} de ${monthName} a las ${time} hs.\nTe contactamos en menos de 24hs para confirmar.\n\nSi necesitás cambiar o cancelar, respondé este mail\no escribinos a ${to}.\n─────────────────────────────────────\nData en Criollo · Análisis LATAM · © 2026`,
    }),
  ])
}

export async function sendConsultingConfirmation(params: {
  email: string
  day: number
  month: number
  year: number
  time: string
}) {
  const { email, day, month, year, time } = params
  const resend = getResend()
  const monthName = MONTH_NAMES[month]

  const from = process.env.RESEND_FROM!
  const to = process.env.RESEND_TO!

  await Promise.all([
    resend.emails.send({
      from,
      to,
      subject: `Nueva consultoría — ${day}/${month} ${time}hs`,
      replyTo: email,
      text: [
        `Nueva solicitud de consultoría`,
        `──────────────────────────────`,
        `Cliente: ${email}`,
        `Fecha: ${day} de ${monthName} de ${year}`,
        `Horario: ${time} hs`,
        ``,
        `El cliente espera una llamada de consultoría financiera PyME.`,
        `Respondé a este correo para confirmar el turno.`,
      ].join('\n'),
    }),

    resend.emails.send({
      from,
      to: email,
      subject: 'Tu consulta está registrada — Consultoría Financiera PyME',
      text: [
        `Data en Criollo — Consultoría Financiera PyME`,
        `────────────────────────────────────────────`,
        ``,
        `Hola,`,
        ``,
        `Recibimos tu solicitud de consultoría para el ${day} de ${monthName} a las ${time} hs.`,
        `Te vamos a contactar en menos de 24 horas para confirmar el turno y coordinar los próximos pasos.`,
        ``,
        `Si necesitás cambiar o cancelar la consulta, respondé a este correo`,
        `o escribinos a ${to}.`,
        ``,
        `────────────────────────────────────────────`,
        `Data en Criollo · Análisis LATAM · © 2026`,
      ].join('\n'),
    }),
  ])
}
