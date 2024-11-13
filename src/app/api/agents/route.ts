import { NextRequest, NextResponse } from 'next/server'

type Agent = {
  id: string
  name: string
  description: string
  type: string
  status: string
  lastActive: string
}

// In-memory agents array
let agents: Agent[] = [
  {
    id: '1',
    name: 'Agent-001',
    description: 'Data Processor Agent',
    type: 'Data Processor',
    status: 'Active',
    lastActive: '2 minutes ago',
  },
  // ... (other existing agents)
]

// Helper function to generate unique IDs
const generateId = () => Math.random().toString(36).substr(2, 9)

// Handle GET and POST requests
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')

  if (id) {
    const agent = agents.find((agent) => agent.id === id)
    if (agent) {
      return NextResponse.json(agent)
    } else {
      return NextResponse.json({ message: 'Agent not found' }, { status: 404 })
    }
  } else {
    return NextResponse.json(agents)
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { name, description } = body

  const newAgent: Agent = {
    id: generateId(),
    name,
    description,
    type: 'Custom Agent',
    status: 'Active',
    lastActive: 'just now',
  }

  agents.push(newAgent)
  return NextResponse.json(newAgent, { status: 201 })
}
