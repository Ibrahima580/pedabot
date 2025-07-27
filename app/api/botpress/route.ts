import { NextResponse } from 'next/server'

const BOTPRESS_WEBHOOK_ID = process.env.BOTPRESS_WEBHOOK_ID
if (!BOTPRESS_WEBHOOK_ID) {
  throw new Error('BOTPRESS_WEBHOOK_ID non défini dans le .env')
}
const BASE_URL = `https://chat.botpress.cloud/${BOTPRESS_WEBHOOK_ID}`

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function waitForBotResponse(
  convId: string,
  userKey: string,
  lastUserMessageId: string,
  intervalMs = 1500,
  maxAttempts = 15
): Promise<string | null> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const res = await fetch(`${BASE_URL}/conversations/${convId}/messages`, {
      headers: { 'x-user-key': userKey },
    })

    if (!res.ok) {
      console.error(`[Polling] Erreur récupération messages : ${res.status}`)
      throw new Error(`Erreur récupération messages : ${res.status}`)
    }

    const data = await res.json()
    const messages = data.messages || []

    const userMsg = messages.find((m: any) => m.id === lastUserMessageId)
    const userMsgDate = userMsg ? new Date(userMsg.createdAt) : new Date(0)

    const botMsg = [...messages]
      .reverse()
      .find(m =>
        m.payload?.type === 'text' &&
        m.id !== lastUserMessageId &&
        m.userId !== userKey &&
        new Date(m.createdAt) > userMsgDate
      )

    if (botMsg) {
      return botMsg.payload.text
    }

    await delay(intervalMs)
  }

  return null
}

export async function POST(request: Request) {
  try {
    const { message, conversationId, userKey: clientUserKey } = await request.json()

    if (typeof message !== 'string' || message.trim() === '') {
      return NextResponse.json({ error: 'Message utilisateur requis.' }, { status: 400 })
    }

    let userKey = clientUserKey
    let convId = conversationId

    if (!userKey) {
      const userRes = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: '{}',
      })

      if (!userRes.ok) {
        console.error('[API] Erreur création utilisateur')
        return NextResponse.json({ error: 'Erreur création utilisateur' }, { status: 500 })
      }

      const userData = await userRes.json()
      userKey = userData.key

      if (!userKey) {
        console.error('[API] Clé utilisateur introuvable après création')
        return NextResponse.json({ error: 'Erreur clé utilisateur' }, { status: 500 })
      }
    }

    if (!convId) {
      const convRes = await fetch(`${BASE_URL}/conversations`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'x-user-key': userKey },
        body: '{}',
      })

      if (!convRes.ok) {
        console.error('[API] Erreur création conversation')
        return NextResponse.json({ error: 'Erreur création conversation' }, { status: 500 })
      }

      const convData = await convRes.json()
      convId = convData.conversation?.id

      if (!convId) {
        console.error('[API] ID conversation introuvable après création')
        return NextResponse.json({ error: 'Erreur ID conversation' }, { status: 500 })
      }
    }

    const msgRes = await fetch(`${BASE_URL}/messages`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'x-user-key': userKey },
      body: JSON.stringify({ conversationId: convId, payload: { type: 'text', text: message } }),
    })

    if (!msgRes.ok) {
      const errorData = await msgRes.json().catch(() => ({}))
      console.error('[API] Erreur envoi message', errorData)
      return NextResponse.json({ error: 'Erreur envoi message', details: errorData }, { status: 500 })
    }

    const msgData = await msgRes.json()
    const lastUserMessageId = msgData.message?.id

    if (!lastUserMessageId) {
      console.error('[API] ID message utilisateur introuvable')
      return NextResponse.json({ error: 'Erreur ID message utilisateur' }, { status: 500 })
    }

    const botReply = await waitForBotResponse(convId, userKey, lastUserMessageId)
    if (!botReply) {
      return NextResponse.json({ error: 'Pas de réponse du bot après attente.' }, { status: 504 })
    }

    return NextResponse.json({ userKey, conversationId: convId, reply: botReply })
  } catch (error: any) {
    console.error('[API] Erreur inconnue', error)
    return NextResponse.json({ error: error.message || 'Erreur inconnue' }, { status: 500 })
  }
}
