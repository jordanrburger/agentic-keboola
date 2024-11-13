import React, { useCallback, useRef, useState, useEffect } from 'react'
import ReactFlow, {
  ReactFlowProvider,
  ReactFlowInstance,
  addEdge,
  Background,
  Controls,
  Connection,
  Edge,
  applyEdgeChanges,
  applyNodeChanges,
  Node,
  EdgeChange,
  NodeChange,
} from 'reactflow'
import 'reactflow/dist/style.css'
import ToolSidebar from '@/components/tool-sidebar'
import CustomNode from '@/components/custom-node'
import { useParams } from 'next/navigation'
import { Button } from './ui/button'

export default function ActionGraph() {
  const params = useParams()
  const agentId = params ? (params.id as string) : null
  const [nodes, setNodes] = useState<Node[]>([])
  const [edges, setEdges] = useState<Edge[]>([])
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null)
  const reactFlowWrapper = useRef<HTMLDivElement>(null)

  const nodeTypes = {
    customNode: CustomNode,
  }

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    []
  )

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    []
  )

  const onConnect = useCallback(
    (connection: Edge | Connection) => setEdges((eds) => addEdge(connection, eds)),
    []
  )

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()

      const reactFlowBounds = reactFlowWrapper.current?.getBoundingClientRect()
      const data = event.dataTransfer.getData('application/reactflow')
      const toolData = JSON.parse(data)

      if (!toolData || !reactFlowBounds) return

      const position = {
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      }

      const newNode: Node = {
        id: `${toolData.id}_${Date.now()}`,
        type: 'customNode',
        position,
        data: {
          label: toolData.name,
          toolId: toolData.id,
          category: toolData.category,
        },
      }

      setNodes((nds) => nds.concat(newNode))
    },
    [setNodes]
  )

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    event.dataTransfer.dropEffect = 'move'
  }, [])

  // Load graph data on mount
  useEffect(() => {
    const fetchGraphData = async () => {
      const res = await fetch(`/api/agents/${agentId}/action-graph`)
      if (res.ok) {
        const data = await res.json()
        setNodes(data.nodes || [])
        setEdges(data.edges || [])
      } else {
        console.error('Failed to load graph data')
      }
    }

    fetchGraphData()
  }, [agentId])

  // Save graph data function
  const saveGraph = async () => {
    if (!reactFlowInstance) return

    const flow = reactFlowInstance.toObject()

    const res = await fetch(`/api/agents/${agentId}/action-graph`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ nodes: flow.nodes, edges: flow.edges }),
    })

    if (res.ok) {
      alert('Graph saved successfully!')
    } else {
      alert('Failed to save graph')
    }
  }

  const onInit = useCallback((rfi: ReactFlowInstance) => {
    setReactFlowInstance(rfi)
  }, [])

  return (
    <div className="flex h-full">
      <div className="w-64 h-full bg-gray-50 dark:bg-gray-800 overflow-y-auto">
        <ToolSidebar />
      </div>

      <div
        className="flex-1 h-full"
        ref={reactFlowWrapper}
        onDrop={onDrop}
        onDragOver={onDragOver}
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            nodeTypes={nodeTypes}
            onInit={onInit}
            fitView
          >
            <Background color="#aaa" gap={16} />
            <Controls />
          </ReactFlow>
          <div className="absolute top-4 right-4 z-10">
            <Button onClick={saveGraph}>Save Graph</Button>
          </div>
        </ReactFlowProvider>
      </div>
    </div>
  )
}