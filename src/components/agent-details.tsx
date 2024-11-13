'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { useRouter, useParams } from 'next/navigation'
import {
  AlertCircle,
  Bot,
  Database,
  Info,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Settings,
  Share2,
  Users,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Slider } from '@/components/ui/slider'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts'
import MainLayout from '@/components/main-layout'
import ToolsComponent from '@/components/tools-component'
import { tools } from '@/components/tools-component'
import ActionGraph from '@/components/action-graph'
import { Textarea } from '@/components/ui/textarea'
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog'
import { Checkbox } from '@/components/ui/checkbox'

interface AgentData {
  name?: string
  created?: string
}

export default function AgentDetails({ agentData }: { agentData: AgentData }) {
  const router = useRouter()
  const params = useParams()
  const agentId = params?.id as string
  const [agentName] = useState(agentData.name || 'Financial Analyst')
  const [created] = useState(agentData.created || '1.3.2023')
  const [selectedTools, setSelectedTools] = useState<string[]>([])
  const [toolsToAdd, setToolsToAdd] = useState<string[]>([])
  const [dialogOpen, setDialogOpen] = useState(false)

  const fetchSelectedTools = async () => {
    const res = await fetch(`/api/agents/${agentId}/tools`)
    if (res.ok) {
      const data = await res.json()
      setSelectedTools(data.tools || [])
    } else {
      console.error('Failed to fetch selected tools')
    }
  }

  useEffect(() => {
    fetchSelectedTools()
  }, [agentId])

  // Sample data for usage graph
  const usageData = Array(10)
    .fill(0)
    .map((_, i) => ({
      name: i.toString(),
      value: Math.floor(Math.random() * 10),
    }))

  const addToolToAgent = async (toolId: string) => {
    const res = await fetch(`/api/agents/${agentId}/tools`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolId }),
    })

    if (res.ok) {
      const data = await res.json()
      setSelectedTools(data.tools)
    } else {
      console.error('Failed to add tool')
    }
  }

  const handleToolSelection = async () => {
    for (const toolId of toolsToAdd) {
      await addToolToAgent(toolId)
    }
    setToolsToAdd([])
  }

  const removeToolFromAgent = async (toolId: string) => {
    const res = await fetch(`/api/agents/${agentId}/tools`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ toolId }),
    })

    if (res.ok) {
      const data = await res.json()
      setSelectedTools(data.tools)
    } else {
      console.error('Failed to remove tool')
    }
  }

  const handleToolsSaved = () => {
    setDialogOpen(false)
    fetchSelectedTools()
  }

  return (
    <MainLayout>
      <div className="p-6 space-y-6 text-gray-900 dark:text-gray-100">
        {/* Header Section */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="rounded-full bg-primary/10 p-4">
              <Bot className="h-8 w-8 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                Agent Details: {agentName}
              </h1>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                ID: <span className="text-blue-600 dark:text-blue-400">{agentId}</span> | Created: {created}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="text-white dark:text-white">Open in Agent Playground</Button>
            <Button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900">
              Start Agent
            </Button>
            <Button variant="destructive" className="text-black">Remove from Organization</Button>
          </div>
        </div>

        {/* Intent Card */}
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="text-sm font-medium mb-2 text-gray-800 dark:text-gray-100">Intent</div>
            <div className="space-y-2">
              <Textarea
                placeholder="Enter agent intent..."
                defaultValue="Reconcile P&L Statements across franchises"
                className="min-h-[100px] bg-gray-50 dark:bg-gray-700 text-sm text-gray-600 dark:text-gray-400 resize-none"
              />
              <div className="flex justify-end">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="text-gray-600 dark:text-gray-400"
                >
                  Save Changes
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Base LLM Settings */}
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-100">Base LLM Settings</h3>
                <Button variant="outline" size="sm" className="text-white dark:text-gray-100">
                  Change Base Model
                </Button>
              </div>
              <div className="space-y-2">
                <div className="w-full h-[200px] bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    Base LLM Settings Panel
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Prompt Settings */}
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4 text-gray-800 dark:text-gray-100">Prompt Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label className="text-gray-800 dark:text-gray-100">Agent Prefix</Label>
                  <Input placeholder="Enter agent prefix..." className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" />
                </div>
                <div>
                  <Label className="text-gray-800 dark:text-gray-100">Agent Suffix</Label>
                  <Input placeholder="Enter agent suffix..." className="bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Agent Usage */}
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4 text-gray-800 dark:text-gray-100">Agent Usage</h3>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={usageData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                    <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
                    <YAxis tick={{ fill: '#4B5563' }} />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="hsl(var(--primary))"
                      strokeWidth={2}
                      dot={{ fill: 'hsl(var(--primary))' }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Graph */}
        <Card className="bg-white dark:bg-gray-800 h-[800px]">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">
              Action Graph
            </CardTitle>
          </CardHeader>
          <CardContent className="h-full">
            <ActionGraph />
          </CardContent>
        </Card>

        {/* Tools */}
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">
                Tools
              </h3>
            </div>

            {/* Dialog to add tools */}
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <div
                  className="flex items-center justify-center border-2 border-dashed rounded-lg p-8 bg-gray-50 dark:bg-gray-700 cursor-pointer"
                  onClick={() => setDialogOpen(true)}
                >
                  <div className="text-center">
                    <Button
                      variant="outline"
                      size="icon"
                      className="mb-4 text-gray-800 dark:text-gray-100 hover:text-gray-900 dark:hover:text-white"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                    <div className="text-sm text-black dark:text-white">
                      Add tools for your agent to use
                    </div>
                  </div>
                </div>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[700px]">
                <div className="space-y-4">
                  <h2 className="text-lg font-medium text-gray-800 dark:text-gray-100">
                    Select Tools to Add
                  </h2>
                  {/* Render ToolsComponent within the dialog */}
                  <ToolsComponent
                    agentId={agentId}
                    onSave={handleToolsSaved}
                    inDialog={true}
                  />
                </div>
              </DialogContent>
            </Dialog>

            {/* Display selected tools */}
            {selectedTools.length > 0 && (
              <div className="mt-4 space-y-2">
                <h4 className="font-medium text-gray-800 dark:text-gray-100">
                  Selected Tools
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedTools.map((toolId) => {
                    const tool = tools.find((t) => t.id === toolId)
                    if (!tool) return null
                    return (
                      <div
                        key={toolId}
                        className="flex items-center p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md"
                      >
                        <div className="flex items-center">
                          {tool.icon}
                          <div className="ml-3">
                            <div className="font-medium text-gray-800 dark:text-gray-100">
                              {tool.name}
                            </div>
                            <div className="text-sm text-gray-600 dark:text-gray-400">
                              {tool.description}
                            </div>
                          </div>
                        </div>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="ml-auto"
                          onClick={() => removeToolFromAgent(toolId)}
                        >
                          Remove
                        </Button>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2">
          {/* Tool Evocations */}
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <h3 className="font-medium mb-4 text-gray-800 dark:text-gray-100">Tool Evocations</h3>
              <div className="h-[200px] flex items-center justify-center text-gray-600 dark:text-gray-400">
                No data available
              </div>
            </CardContent>
          </Card>

          {/* Evaluation Settings */}
          <Card className="bg-white dark:bg-gray-800">
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-medium text-gray-800 dark:text-gray-100">Evaluation Settings</h3>
                <Info className="h-4 w-4 text-gray-500 dark:text-gray-400" />
              </div>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-gray-800 dark:text-gray-100">Evaluation Type</Label>
                  </div>
                  <Switch />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-800 dark:text-gray-100">Accuracy</Label>
                    <Switch />
                  </div>
                  <Slider defaultValue={[75]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-800 dark:text-gray-100">Relevance</Label>
                    <Switch />
                  </div>
                  <Slider defaultValue={[80]} max={100} step={1} />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label className="text-gray-800 dark:text-gray-100">Harmfulness</Label>
                    <Switch />
                  </div>
                  <Slider defaultValue={[90]} max={100} step={1} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Agent Executions */}
        <Card className="bg-white dark:bg-gray-800">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium text-gray-800 dark:text-gray-100">Agent Executions</h3>
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                <Input placeholder="Search" className="pl-8 w-[300px] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100" />
              </div>
            </div>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-800 dark:text-gray-100">Description</TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">Created</TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">Refreshed</TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">Expires</TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">Files</TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">Components</TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">Buckets</TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">Tokens</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium text-gray-800 dark:text-gray-100">
                    [internal] Token for triggering 29730472
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">FEB 17, 2021</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">FEB 17, 2021</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">never</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">all</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">all</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">all</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">all</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium text-gray-800 dark:text-gray-100">
                    [internal] Scheduler for 46392002 Scheduler
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">FEB 17, 2021</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">FEB 17, 2021</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">FEB 17, 2022</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">all</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">none</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">1 bucket</TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-400">all</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}