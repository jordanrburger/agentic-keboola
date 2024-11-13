"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
} from '@/components/ui/card'
import {
  Info, Database, Code, FileText, Cog, Play, Table, BarChart,
  Workflow, Zap, Upload, Download, Shield, Brain, Image as ImageIcon,
  MessageSquare, Eraser, TrendingUp, DatabaseIcon, AlertCircle, Activity, Layers
} from "lucide-react"

interface InputType {
  name: string
  type: keyof typeof inputTypeStyles
}

interface OutputType {
  name: string
  type: keyof typeof outputTypeStyles
}

interface Tool {
  id: string
  name: string
  icon: React.ReactNode
  inputs: InputType[]
  outputs: OutputType[]
  description: string
  category: 'tool' | 'workflow'
}

const inputTypeStyles = {
  config: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  user: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  storage: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  session: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  table: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  bucket: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  query: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  data: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  model: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  pipeline: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  text: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100",
  image: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100",
  metrics: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  analysis: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  classification: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100"
} as const

const outputTypeStyles = {
  job: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100",
  code: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100",
  metadata: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100",
  data: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100",
  visualization: "bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-100",
  config: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  metrics: "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-100",
  model: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-100",
  analysis: "bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-100",
  classification: "bg-teal-100 text-teal-800 dark:bg-teal-900 dark:text-teal-100",
  pipeline: "bg-pink-100 text-pink-800 dark:bg-pink-900 dark:text-pink-100",
  text: "bg-violet-100 text-violet-800 dark:bg-violet-900 dark:text-violet-100",
  image: "bg-cyan-100 text-cyan-800 dark:bg-cyan-900 dark:text-cyan-100"
} as const

export const tools: Tool[] = [
  {
    id: "job-executor",
    name: "Job Executor",
    icon: <Play className="h-6 w-6 text-blue-500" />,
    inputs: [
      { name: "Configuration ID", type: "config" }
    ],
    outputs: [
      { name: "Job ID", type: "job" }
    ],
    description: "Executes jobs based on the provided configuration",
    category: 'tool'
  },
  {
    id: "sql-generator",
    name: "SQL Generator", 
    icon: <Code className="h-6 w-6 text-purple-500" />,
    inputs: [
      { name: "User Input", type: "user" },
      { name: "Storage Objects", type: "storage" },
      { name: "Session Context", type: "session" }
    ],
    outputs: [
      { name: "Generated Code", type: "code" }
    ],
    description: "Generates SQL queries based on natural language input",
    category: 'tool'
  },
  {
    id: "data-storage-reader",
    name: "Data Storage Reader",
    icon: <Database className="h-6 w-6 text-green-500" />,
    inputs: [
      { name: "Table ID", type: "table" },
      { name: "Bucket ID", type: "bucket" }
    ],
    outputs: [
      { name: "Table/Bucket Metadata", type: "metadata" },
      { name: "Data Sample", type: "data" }
    ],
    description: "Reads and samples data from storage locations",
    category: 'tool'
  },
  {
    id: "python-generator",
    name: "Python Generator",
    icon: <Code className="h-6 w-6 text-yellow-500" />,
    inputs: [
      { name: "User Input", type: "user" },
      { name: "Data Context", type: "data" }
    ],
    outputs: [
      { name: "Generated Code", type: "code" }
    ],
    description: "Generates Python code for data processing tasks",
    category: 'tool'
  },
  {
    id: "extractor-config-generator",
    name: "Extractor Configuration Generator",
    icon: <Cog className="h-6 w-6 text-indigo-500" />,
    inputs: [
      { name: "Source Type", type: "user" },
      { name: "Credentials", type: "config" }
    ],
    outputs: [
      { name: "Extractor Config", type: "config" }
    ],
    description: "Generates configuration for data extraction components",
    category: 'tool'
  },
  {
    id: "writer-config-generator",
    name: "Writer Configuration Generator",
    icon: <Cog className="h-6 w-6 text-pink-500" />,
    inputs: [
      { name: "Destination Type", type: "user" },
      { name: "Schema", type: "data" }
    ],
    outputs: [
      { name: "Writer Config", type: "config" }
    ],
    description: "Generates configuration for data writing components",
    category: 'tool'
  },
  {
    id: "data-profiler",
    name: "Data Profiler",
    icon: <BarChart className="h-6 w-6 text-orange-500" />,
    inputs: [
      { name: "Table ID", type: "table" }
    ],
    outputs: [
      { name: "Profile Report", type: "data" },
      { name: "Data Quality Metrics", type: "metrics" }
    ],
    description: "Analyzes and profiles data, providing statistical insights",
    category: 'tool'
  },
  {
    id: "transformation-suggester",
    name: "Transformation Suggester",
    icon: <Zap className="h-6 w-6 text-yellow-500" />,
    inputs: [
      { name: "Source Data", type: "data" },
      { name: "Target Schema", type: "data" }
    ],
    outputs: [
      { name: "Suggested Transformations", type: "code" }
    ],
    description: "Suggests data transformations based on source and target schemas",
    category: 'tool'
  },
  {
    id: "pipeline-optimizer",
    name: "Pipeline Optimizer",
    icon: <Workflow className="h-6 w-6 text-blue-500" />,
    inputs: [
      { name: "Pipeline Config", type: "pipeline" },
      { name: "Performance Metrics", type: "metrics" }
    ],
    outputs: [
      { name: "Optimized Pipeline", type: "pipeline" }
    ],
    description: "Analyzes and optimizes data pipeline configurations",
    category: 'tool'
  },
  {
    id: "data-validator",
    name: "Data Validator",
    icon: <Shield className="h-6 w-6 text-green-500" />,
    inputs: [
      { name: "Data Sample", type: "data" },
      { name: "Validation Rules", type: "config" }
    ],
    outputs: [
      { name: "Validation Report", type: "data" }
    ],
    description: "Validates data against predefined rules",
    category: 'tool'
  },
  {
    id: "ml-model-trainer",
    name: "ML Model Trainer",
    icon: <Brain className="h-6 w-6 text-purple-500" />,
    inputs: [
      { name: "Training Data", type: "data" },
      { name: "Model Parameters", type: "config" }
    ],
    outputs: [
      { name: "Trained Model", type: "model" },
      { name: "Performance Metrics", type: "metrics" }
    ],
    description: "Trains machine learning models on provided data",
    category: 'tool'
  },
  {
    id: "data-anonymizer",
    name: "Data Anonymizer",
    icon: <Shield className="h-6 w-6 text-red-500" />,
    inputs: [
      { name: "Source Data", type: "data" },
      { name: "Anonymization Rules", type: "config" }
    ],
    outputs: [
      { name: "Anonymized Data", type: "data" }
    ],
    description: "Anonymizes sensitive data based on predefined rules",
    category: 'tool'
  },
  {
    id: "nlp-processor",
    name: "NLP Processor",
    icon: <MessageSquare className="h-6 w-6 text-violet-500" />,
    inputs: [
      { name: "Text Input", type: "text" },
      { name: "Processing Config", type: "config" }
    ],
    outputs: [
      { name: "Processed Text", type: "data" },
      { name: "NLP Analysis", type: "analysis" }
    ],
    description: "Processes and analyzes natural language text",
    category: 'tool'
  },
  {
    id: "image-processor",
    name: "Image Processor",
    icon: <ImageIcon className="h-6 w-6 text-cyan-500" />,
    inputs: [
      { name: "Image Input", type: "image" }
    ],
    outputs: [
      { name: "Classification Results", type: "classification" }
    ],
    description: "Processes and analyzes images",
    category: 'tool'
  },
  {
    id: "data-cleaner",
    name: "Data Cleaner",
    icon: <Eraser className="h-6 w-6 text-amber-500" />,
    inputs: [
      { name: "Raw Data", type: "data" }
    ],
    outputs: [
      { name: "Cleaned Data", type: "data" },
      { name: "Data Quality Metrics", type: "metrics" }
    ],
    description: "Cleans and preprocesses data",
    category: 'tool'
  },
  {
    id: "trend-analyzer",
    name: "Trend Analyzer",
    icon: <TrendingUp className="h-6 w-6 text-teal-500" />,
    inputs: [
      { name: "Time Series Data", type: "data" }
    ],
    outputs: [
      { name: "Trend Analysis", type: "analysis" },
      { name: "Forecast Results", type: "data" }
    ],
    description: "Analyzes trends and generates forecasts",
    category: 'tool'
  },
  {
    id: "data-sync",
    name: "Data Sync",
    icon: <Upload className="h-6 w-6 text-blue-500" />,
    inputs: [
      { name: "Source Config", type: "config" },
      { name: "Target Config", type: "config" }
    ],
    outputs: [
      { name: "Sync Status", type: "metadata" },
      { name: "Transfer Metrics", type: "metrics" }
    ],
    description: "Synchronizes data between different storage locations",
    category: 'tool'
  },
  {
    id: 'performance-metrics',
    name: 'Performance Metrics',
    category: 'tool',
    icon: <Activity className="w-4 h-4 text-gray-600 dark:text-gray-400" />,
    inputs: [],
    outputs:[],
    description: ""
  },
  {
    id: 'process-point',
    name: 'Process Point',
    category: 'workflow',
    icon: <Layers className="w-4 h-4 text-blue-600" />,
    inputs: [],
    outputs: [],
    description: "Represents a processing step in the workflow"
  },
  {
    id: 'data-storage',
    name: 'Data Storage',
    category: 'workflow', 
    icon: <DatabaseIcon className="w-4 h-4 text-green-600" />,
    inputs: [
      { name: "Data", type: "data" }
    ],
    outputs: [
      { name: "Stored Data", type: "data" }
    ],
    description: "Stores and retrieves data in the workflow"
  },
  {
    id: 'decision-point',
    name: 'Decision Point',
    category: 'workflow',
    icon: <Zap className="w-4 h-4 text-yellow-600" />,
    inputs: [
      { name: "Condition Data", type: "data" }
    ],
    outputs: [
      { name: "Decision Result", type: "metadata" }
    ],
    description: "Makes decisions based on input conditions"
  },
  {
    id: 'alert',
    name: 'Alert',
    category: 'workflow',
    icon: <AlertCircle className="w-4 h-4 text-red-600" />,
    inputs: [
      { name: "Alert Data", type: "data" }
    ],
    outputs: [
      { name: "Alert Status", type: "metadata" }
    ],
    description: "Generates alerts based on conditions"
  },
  {
    id: 'real-time-stream',
    name: 'Real-Time Stream',
    category: 'workflow',
    icon: <Activity className="w-4 h-4 text-purple-600" />,
    inputs: [
      { name: "Stream Data", type: "data" }
    ],
    outputs: [
      { name: "Processed Stream", type: "data" },
      { name: "Stream Metrics", type: "metrics" }
    ],
    description: "Processes real-time data streams"
  },
]

const getInputTypeStyles = (type: keyof typeof inputTypeStyles) => {
  const baseStyles = "px-2.5 py-0.5 rounded-md text-sm font-medium"
  return `${baseStyles} ${inputTypeStyles[type]}`
}

const getOutputTypeStyles = (type: keyof typeof outputTypeStyles) => {
  const baseStyles = "px-2.5 py-0.5 rounded-md text-sm font-medium"
  return `${baseStyles} ${outputTypeStyles[type]}`
}

interface ToolsComponentProps {
  agentId: string
  onSave?: () => void
  inDialog?: boolean
}

export default function ToolsComponent({
  agentId,
  onSave,
  inDialog = false,
}: ToolsComponentProps) {
  const router = useRouter()
  const [selectedTools, setSelectedTools] = useState<string[]>([])

  useEffect(() => {
    const fetchSelectedTools = async () => {
      const res = await fetch(`/api/agents/${agentId}/tools`)
      if (res.ok) {
        const data = await res.json()
        setSelectedTools(data.tools || [])
      } else {
        console.error('Failed to fetch selected tools')
      }
    }

    fetchSelectedTools()
  }, [agentId])

  const handleToolSelection = (toolId: string) => {
    setSelectedTools((prevSelected) =>
      prevSelected.includes(toolId)
        ? prevSelected.filter((id) => id !== toolId)
        : [...prevSelected, toolId]
    )
  }

  const handleSave = async () => {
    const res = await fetch(`/api/agents/${agentId}/tools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolIds: selectedTools }),
    })

    if (res.ok) {
      if (onSave) {
        onSave()
      } else {
        router.push(`/agents/${agentId}`)
      }
    } else {
      console.error('Failed to save selected tools')
    }
  }

  return (
    <div className="space-y-4">
      {tools.map((tool) => (
        <Card
          key={tool.id}
          className="hover:shadow-md transition-shadow bg-white dark:bg-gray-800"
        >
          <CardContent className="p-6 flex items-center">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-[2fr,3fr,3fr] gap-4 items-center">
              <div className="flex items-center space-x-3">
                {tool.icon}
                <span className="font-medium text-gray-800 dark:text-gray-100">
                  {tool.name}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {tool.inputs.map((input, index) => (
                  <span key={index} className={getInputTypeStyles(input.type)}>
                    {input.name}
                  </span>
                ))}
              </div>
              <div className="flex flex-wrap gap-2">
                {tool.outputs.map((output, index) => (
                  <span key={index} className={getOutputTypeStyles(output.type)}>
                    {output.name}
                  </span>
                ))}
              </div>
            </div>
            <div className="ml-4">
              <Checkbox
                id={tool.id}
                checked={selectedTools.includes(tool.id)}
                onCheckedChange={() => handleToolSelection(tool.id)}
                className="border-gray-500 text-blue-600 dark:text-blue-400"
              />
            </div>
          </CardContent>
        </Card>
      ))}
      <div className="flex justify-end mt-4">
        <Button
          onClick={handleSave}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          {inDialog ? 'Add Selected Tools' : 'Save Selected Tools'}
        </Button>
      </div>
    </div>
  )
}
