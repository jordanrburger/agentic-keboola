'use client'

import { useSearchParams } from 'next/navigation'
import {
  Bell,
  ChevronDown,
  LogOut,
} from 'lucide-react'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from '@/components/ui/avatar'
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
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import MainLayout from '@/components/main-layout'
import ToolsComponent from '@/components/tools-component'
export default function ToolsPage() {
  const searchParams = useSearchParams()
  if (!searchParams) {
    return null
  }
  const agentId = searchParams.get('agentId')

  return (
    <MainLayout>
      <div className="p-6 text-gray-900 dark:text-gray-100">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">
              Select Tools for Agent {agentId}
            </CardTitle>
            <CardDescription className="text-gray-600 dark:text-gray-400">
              Select tools to assign to your agent.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ToolsComponent agentId={agentId || ''} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}