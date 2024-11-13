import React from 'react'
import { tools } from '@/components/tools-component'

export default function ToolSidebar() {
  const onDragStart = (event: React.DragEvent, tool: any) => {
    const dragData = { id: tool.id, name: tool.name, category: tool.category }
    event.dataTransfer.setData('application/reactflow', JSON.stringify(dragData))
    event.dataTransfer.effectAllowed = 'move'
  }

  // Separate tools by category
  const regularTools = tools.filter((tool) => tool.category === 'tool')
  const workflowTools = tools.filter((tool) => tool.category === 'workflow')

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
        Workflow Tools
      </h3>
      <div className="mt-4 space-y-2">
        {workflowTools.map((tool) => (
          <div
            key={tool.id}
            className="p-2 bg-white dark:bg-gray-700 rounded-md shadow cursor-pointer"
            onDragStart={(event) => onDragStart(event, tool)}
            draggable
          >
            <div className="flex items-center space-x-2">
              {tool.icon}
              <span className="text-gray-800 dark:text-gray-100">{tool.name}</span>
            </div>
          </div>
        ))}
      </div>

      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mt-8">
        Tools
      </h3>
      <div className="mt-4 space-y-2">
        {regularTools.map((tool) => (
          <div
            key={tool.id}
            className="p-2 bg-white dark:bg-gray-700 rounded-md shadow cursor-pointer"
            onDragStart={(event) => onDragStart(event, tool)}
            draggable
          >
            <div className="flex items-center space-x-2">
              {tool.icon}
              <span className="text-gray-800 dark:text-gray-100">{tool.name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}