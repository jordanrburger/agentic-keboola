'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import {
  Search,
  Plus,
  MoreHorizontal,
  MessageSquare,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
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
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import MainLayout from '@/components/main-layout'

type Agent = {
  id: string
  name: string
  description: string
  type: string
  status: string
  lastActive: string
}

export default function AgentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [agents, setAgents] = useState<Agent[]>([])

  useEffect(() => {
    // Fetch agents from API
    const fetchAgents = async () => {
      const res = await fetch('/api/agents')
      if (res.ok) {
        const data = await res.json()
        setAgents(data)
      } else {
        console.error('Failed to fetch agents')
      }
    }

    fetchAgents()
  }, [])

  const filteredAgents = agents.filter(
    (agent) =>
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === 'all' ||
        agent.status.toLowerCase() === statusFilter.toLowerCase())
  )

  return (
    <MainLayout>
      <div className="p-6 text-gray-900 dark:text-gray-100">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">
              Manage Agents
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              View and manage your agents
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between pb-4">
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
                  <Input
                    placeholder="Search agents..."
                    className="pl-8 bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-[180px] bg-gray-50 dark:bg-gray-700 text-gray-800 dark:text-gray-100">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Statuses</SelectItem>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Idle">Idle</SelectItem>
                    <SelectItem value="Maintenance">Maintenance</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Link href="/agents/new">
                <Button>
                  <Plus className="mr-2 h-4 w-4" /> Add Agent
                </Button>
              </Link>
            </div>

            {/* Agents Table */}
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Name
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Type
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Status
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Last Active
                  </TableHead>
                  <TableHead className="text-gray-800 dark:text-gray-100">
                    Actions
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredAgents.map((agent) => (
                  <TableRow key={agent.id}>
                    <TableCell className="font-medium text-blue-600 dark:text-blue-400">
                      <Link href={`/agents/${agent.id}`} className="hover:underline">
                        {agent.name}
                      </Link>
                    </TableCell>
                    <TableCell className="text-gray-800 dark:text-gray-100">
                      {agent.type}
                    </TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          agent.status === 'Active'
                            ? 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                            : agent.status === 'Idle'
                            ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100'
                            : 'bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100'
                        }`}
                      >
                        {agent.status}
                      </span>
                    </TableCell>
                    <TableCell className="text-gray-800 dark:text-gray-100">
                      {agent.lastActive}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        <Link href={`/agents/${agent.id}/chat`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-white dark:text-white"
                          >
                            <MessageSquare className="mr-1 h-4 w-4" />
                            Chat
                          </Button>
                        </Link>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Open menu</span>
                              <MoreHorizontal className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent
                            align="end"
                            className="bg-white dark:bg-gray-800"
                          >
                            <DropdownMenuItem className="text-gray-800 dark:text-gray-100">
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-800 dark:text-gray-100">
                              Edit Agent
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-gray-800 dark:text-gray-100">
                              Pause Agent
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="my-1" />
                            <DropdownMenuItem className="text-red-600 dark:text-red-400">
                              Delete Agent
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}