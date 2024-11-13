import { NextRequest, NextResponse } from 'next/server'

// Mock database for agent-tools associations
let agentToolsMap: Record<string, string[]> = {}

// GET /api/agents/{id}/tools
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: agentId } = params
  const tools = agentToolsMap[agentId] || []
  return NextResponse.json({ tools })
}

// POST /api/agents/{id}/tools
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: agentId } = params
  const { toolIds } = await request.json()

  if (!toolIds || !Array.isArray(toolIds)) {
    return NextResponse.json({ message: 'Tool IDs are required' }, { status: 400 })
  }

  if (!agentToolsMap[agentId]) {
    agentToolsMap[agentId] = []
  }

  agentToolsMap[agentId] = Array.from(new Set([...agentToolsMap[agentId], ...toolIds]))

  return NextResponse.json({ tools: agentToolsMap[agentId] })
}

// DELETE /api/agents/{id}/tools
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: agentId } = params
  const { toolId } = await request.json()

  if (!toolId) {
    return NextResponse.json({ message: 'Tool ID is required' }, { status: 400 })
  }

  const tools = agentToolsMap[agentId]
  if (!tools) {
    return NextResponse.json({ message: 'Agent not found' }, { status: 404 })
  }

  agentToolsMap[agentId] = tools.filter((id) => id !== toolId)

  return NextResponse.json({ tools: agentToolsMap[agentId] })
}
