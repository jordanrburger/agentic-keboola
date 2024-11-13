'use client'
import { useParams, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AgentDetails from '@/components/agent-details'

export default function AgentDetailsPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id
  const [agentData, setAgentData] = useState<{name?: string, created?: string} | null>(null)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchAgent = async () => {
      try {
        const res = await fetch(`/api/agents/${id}`)
        if (res.ok) {
          const data = await res.json()
          setAgentData(data)
          setError(false)
        } else {
          console.error('Failed to fetch agent data:', res.status, res.statusText)
          setError(true)
          // Redirect to agents list if agent not found
          if (res.status === 404) {
            router.push('/agents')
          }
        }
      } catch (error) {
        console.error('Error fetching agent data:', error)
        setError(true)
      }
    }

    if (id) {
      fetchAgent()
    }
  }, [id, router])

  if (error) {
    return <div>Error loading agent data. Redirecting...</div>
  }

  if (!agentData) {
    return <div>Loading...</div>
  }

  return <AgentDetails agentData={agentData} />
}