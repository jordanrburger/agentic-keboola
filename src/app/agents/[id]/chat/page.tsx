'use client'

import { useParams } from 'next/navigation'
import AgentChat from '@/components/agent-chat'
import MainLayout from '@/components/main-layout'

export default function AgentChatPage() {
  const params = useParams()
  const id = params?.id

  return (
    <MainLayout>
      <AgentChat agentId={id as string} />
    </MainLayout>
  )
}
