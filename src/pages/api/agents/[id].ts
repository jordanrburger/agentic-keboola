import { NextApiRequest, NextApiResponse } from 'next'

// Mock data or replace with your actual data source
const agents = [
  { id: '1', name: 'Agent Smith', description: 'An AI agent' },
  { id: '2', name: 'Agent Johnson', description: 'Another AI agent' },
  // Add more agents as needed
]

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query

  if (req.method === 'GET') {
    // Find the agent by ID
    const agent = agents.find((agent) => agent.id === id)

    if (agent) {
      res.status(200).json(agent)
    } else {
      res.status(404).json({ message: 'Agent not found' })
    }
  } else {
    // Handle unsupported methods
    res.setHeader('Allow', ['GET'])
    res.status(405).end(`Method ${req.method} Not Allowed`)
  }
} 