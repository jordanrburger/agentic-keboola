import { NextRequest, NextResponse } from 'next/server'

// Mock database for agent action graphs
let agentGraphs: Record<string, { nodes: any[]; edges: any[] }> = {}

// GET /api/agents/{id}/action-graph
export async function GET(
  _request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: agentId } = params
  const graphData = agentGraphs[agentId] || { nodes: [], edges: [] }
  return NextResponse.json(graphData)
}

// POST /api/agents/{id}/action-graph
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id: agentId } = params
  const graphData = await request.json()

  agentGraphs[agentId] = graphData

  return NextResponse.json({ message: 'Graph saved successfully' })
}
