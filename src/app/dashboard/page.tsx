'use client'

import { useState } from 'react'
import {
  Bell,
  ChevronDown,
  Cpu,
  Home,
  LayoutDashboard,
  LogOut,
  Search,
  Settings,
  Users,
} from 'lucide-react'
import Image from "next/image"
import Link from "next/link"



import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Separator } from '@/components/ui/separator'

import MainLayout from '@/components/main-layout'

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
} from 'recharts'

export default function Dashboard() {
  const [activeAgents, setActiveAgents] = useState(42)
  const [completedTasks, setCompletedTasks] = useState(128)
  const [systemHealth, setSystemHealth] = useState(98)

  const recentTasks = [
    { id: 1, name: 'Data Processing', status: 'Completed', agent: 'Agent-001' },
    {
      id: 2,
      name: 'Model Training',
      status: 'In Progress',
      agent: 'Agent-015',
    },
    {
      id: 3,
      name: 'Anomaly Detection',
      status: 'Queued',
      agent: 'Agent-007',
    },
    {
      id: 4,
      name: 'Report Generation',
      status: 'Completed',
      agent: 'Agent-022',
    },
  ]

  const performanceData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 200 },
    { name: 'Apr', value: 278 },
    { name: 'May', value: 189 },
    { name: 'Jun', value: 239 },
    { name: 'Jul', value: 349 },
  ]

  const onlineOrdersData = [
    { date: '2023-06-01', orders: 120 },
    { date: '2023-06-02', orders: 132 },
    { date: '2023-06-03', orders: 101 },
    { date: '2023-06-04', orders: 134 },
    { date: '2023-06-05', orders: 90 },
    { date: '2023-06-06', orders: 110 },
    { date: '2023-06-07', orders: 85 },
  ]

  const websiteVisitorsData = [
    { date: '2023-06-01', visitors: 1500 },
    { date: '2023-06-02', visitors: 1600 },
    { date: '2023-06-03', visitors: 1750 },
    { date: '2023-06-04', visitors: 1400 },
    { date: '2023-06-05', visitors: 2000 },
    { date: '2023-06-06', visitors: 2200 },
    { date: '2023-06-07', visitors: 1900 },
  ]

  const userActivityData = [
    { date: '2023-06-01', edits: 500 },
    { date: '2023-06-02', edits: 400 },
    { date: '2023-06-03', edits: 300 },
    { date: '2023-06-04', edits: 600 },
    { date: '2023-06-05', edits: 500 },
    { date: '2023-06-06', edits: 700 },
    { date: '2023-06-07', edits: 800 },
    { date: '2023-06-08', edits: 900 },
    { date: '2023-06-09', edits: 750 },
  ]

  return (
    <MainLayout>
      <div className="p-6 text-gray-900 dark:text-gray-100">
        {/* AI Assistant Section */}
        <div className="mb-8 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 p-4 sm:p-6 text-white">
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="rounded-full bg-white p-2">
              <Image src="https://components.keboola.com/images/default-app-icon.png" alt="Assistant" width={48} height={48} className="rounded-full" />
            </div>
            <div className="flex-1">
              <Input
                placeholder="How can I help you?"
                className="mb-4 bg-white/20 text-white placeholder-white/70 sm:mb-4"
              />
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
                <Button variant="secondary" className="h-auto whitespace-normal bg-white/10 p-4 text-left text-sm text-white hover:bg-white/20">
                  Give me revenue projections for our next fiscal year
                </Button>
                <Button variant="secondary" className="h-auto whitespace-normal bg-white/10 p-4 text-left text-sm text-white hover:bg-white/20">
                  Help me begin collecting customer feedback from a Typeform survey
                </Button>
                <Button variant="secondary" className="h-auto whitespace-normal bg-white/10 p-4 text-left text-sm text-white hover:bg-white/20">
                  Analyze customer data for insights and trends
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Alerts Section */}
        <div className="mb-8 space-y-4">
          <div className="flex items-center justify-between rounded-lg border bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center gap-4">
              <span className="rounded bg-red-100 text-red-800 px-2 py-1 text-xs font-medium">FLOWS</span>
              <p className="text-gray-800 dark:text-gray-200">Flow Data import from Hotjar has encountered ERROR.</p>
            </div>
            <div className="flex gap-2">
              <Button>DETAILS</Button>
              <Button variant="outline" className="text-white dark:text-white-200">CLOSE</Button>
            </div>
          </div>
          <div className="flex items-center justify-between rounded-lg border bg-white dark:bg-gray-800 p-4">
            <div className="flex items-center gap-4">
              <span className="rounded bg-blue-100 text-blue-800 px-2 py-1 text-xs font-medium">USERS</span>
              <p className="text-gray-800 dark:text-gray-200">Petr Dospiva has been added to project User Feedback.</p>
            </div>
            <div className="flex gap-2">
              <Button>DETAILS</Button>
              <Button variant="outline" className="text-white dark:text-white-200">CLOSE</Button>
            </div>
          </div>
        </div>

        {/* Analytics Grid */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Storage Overview</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-gray-800 dark:text-gray-100">0.23 TB</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">+2% vs last month</div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">672 tables</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">+5% vs last month</div>
              </div>
              <div className="mt-4 text-center">
                <div className="text-sm text-gray-600 dark:text-gray-400">(368,268,914 Rows)</div>
                <Button variant="link" className="mt-2 text-blue-600 dark:text-blue-400">Storage Overview &gt;</Button>
              </div>
            </CardContent>
          </Card>
          <Card className="col-span-2 bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Identified Anomalies</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 dark:text-gray-100">online_orders</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-red-600">There have been fewer orders this week.</span>
                      <Link href="/agents/new?anomaly=online_orders">
                        <Button size="sm" variant="secondary" className="px-3 bg-green-500 hover:bg-green-600 text-white">
                          Launch Agent
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={onlineOrdersData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="date" tick={{ fill: '#4B5563' }} />
                      <YAxis tick={{ fill: '#4B5563' }} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          borderColor: '#374151',
                        }}
                        itemStyle={{ color: '#D1D5DB' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="orders"
                        stroke="#EF4444"
                        dot={{ fill: '#EF4444' }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-800 dark:text-gray-100">website_visitors</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-green-600">Website visits hit a new all-time high this month.</span>
                      <Link href="/agents/new?anomaly=website_visitors">
                        <Button size="sm" variant="secondary" className="px-3 bg-green-500 hover:bg-green-600 text-white">
                          Launch Agent
                        </Button>
                      </Link>
                    </div>
                  </div>
                  <ResponsiveContainer width="100%" height={100}>
                    <LineChart data={websiteVisitorsData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                      <XAxis dataKey="date" tick={{ fill: '#4B5563' }} />
                      <YAxis tick={{ fill: '#4B5563' }} />
                      <RechartsTooltip
                        contentStyle={{
                          backgroundColor: '#1F2937',
                          borderColor: '#374151',
                        }}
                        itemStyle={{ color: '#D1D5DB' }}
                      />
                      <Line
                        type="monotone"
                        dataKey="visitors"
                        stroke="#10B981"
                        dot={{ fill: '#10B981' }}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* User Activity Graph */}
        <Card className="mt-6 bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">User Activity Graph - Configuration Edits</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={userActivityData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                <XAxis dataKey="date" tick={{ fill: '#4B5563' }} />
                <YAxis tick={{ fill: '#4B5563' }} />
                <RechartsTooltip
                  contentStyle={{
                    backgroundColor: '#1F2937',
                    borderColor: '#374151',
                  }}
                  itemStyle={{ color: '#D1D5DB' }}
                />
                <Line
                  type="monotone"
                  dataKey="edits"
                  stroke="#3B82F6"
                  dot={{ fill: '#3B82F6' }}
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
            <div className="mt-4 flex items-center justify-center space-x-4">
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="/placeholder.svg" alt="AI Gorithm" />
                  <AvatarFallback>AG</AvatarFallback>
                </Avatar>
                <span className="text-gray-800 dark:text-gray-100">AI Gorithm</span>
              </div>
              <div className="flex items-center">
                <Avatar className="h-8 w-8 mr-2">
                  <AvatarImage src="https://components.keboola.com/images/default-app-icon.png" alt="Dee Cipher" />
                  <AvatarFallback>DC</AvatarFallback>
                </Avatar>
                <span className="text-gray-800 dark:text-gray-100">Dee Cipher</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6 mb-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Active Agents</CardTitle>
              <Users className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{activeAgents}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">+2 from last hour</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Completed Tasks</CardTitle>
              <Cpu className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{completedTasks}</div>
              <p className="text-xs text-gray-600 dark:text-gray-400">+15% from last week</p>
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">System Health</CardTitle>
              <Cpu className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-800 dark:text-gray-100">{systemHealth}%</div>
              <Progress value={systemHealth} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Performance</CardTitle>
              <Cpu className="h-4 w-4 text-gray-600 dark:text-gray-300" />
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={100}>
                <BarChart data={performanceData}>
                  <XAxis dataKey="name" tick={{ fill: '#4B5563' }} />
                  <YAxis tick={{ fill: '#4B5563' }} />
                  <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
                  <RechartsTooltip
                    contentStyle={{
                      backgroundColor: '#1F2937',
                      borderColor: '#374151',
                    }}
                    itemStyle={{ color: '#D1D5DB' }}
                  />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">Recent Tasks</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Overview of the latest agent activities</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-medium text-gray-800 dark:text-gray-100">{task.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">{task.agent}</p>
                    </div>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        task.status === 'Completed'
                          ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          : task.status === 'In Progress'
                          ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100'
                          : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200'
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-800">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-100">System Overview</CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">Real-time metrics of your Agentic Keboola system</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">CPU Usage</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">65%</span>
                  </div>
                  <Progress value={65} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Memory Usage</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">48%</span>
                  </div>
                  <Progress value={48} />
                </div>
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-800 dark:text-gray-100">Network Load</span>
                    <span className="text-sm text-gray-600 dark:text-gray-400">72%</span>
                  </div>
                  <Progress value={72} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}