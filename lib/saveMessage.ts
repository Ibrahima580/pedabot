import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
)

export async function saveMessage({
  userKey,
  conversationId,
  role,
  content,
}: {
  userKey: string | null
  conversationId: string | null
  role: 'user' | 'bot'
  content: string
}) {
  const { error } = await supabase.from('messages').insert({
    user_key: userKey,
    conversation_id: conversationId,
    role,
    content,
  })

  if (error && process.env.NODE_ENV !== 'production') {
    console.error('Erreur enregistrement message Supabase:', error)
  }
}
