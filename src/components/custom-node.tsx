import React from 'react'
import { Handle, Position } from 'reactflow'
import { tools } from '@/components/tools-component'

interface CustomNodeProps {
  data: {
    label: string
    toolId: string
    category: 'tool' | 'workflow'
  }
}

export default function CustomNode({ data }: CustomNodeProps) {
  const tool = tools.find((t) => t.id === data.toolId)
  const icon = tool ? tool.icon : null

  const isWorkflowTool = data.category === 'workflow'

  const nodeStyles = isWorkflowTool
    ? 'bg-blue-100 dark:bg-blue-800 border-blue-300 dark:border-blue-600'
    : 'bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600'

  return (
    <div
      className={`p-4 ${nodeStyles} border rounded-md shadow-md`}
      style={{ minWidth: 150 }}
    >
      <div className="flex items-center space-x-2">
        {icon}
        <div className="text-gray-800 dark:text-gray-100 font-medium">
          {data.label}
        </div>
      </div>

      {/* Customize Handles based on tool type */}
      {isWorkflowTool ? (
        <>
          <Handle
            type="target"
            position={Position.Left}
            className="w-3 h-3 bg-blue-500 border-white"
          />
          <Handle
            type="source"
            position={Position.Right}
            className="w-3 h-3 bg-blue-500 border-white"
          />
        </>
      ) : (
        <>
          <Handle
            type="target"
            position={Position.Top}
            className="w-3 h-3 bg-green-500 border-white"
          />
          <Handle
            type="source"
            position={Position.Bottom}
            className="w-3 h-3 bg-green-500 border-white"
          />
        </>
      )}
    </div>
  )
}