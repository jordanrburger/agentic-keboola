'use client'

import Link from 'next/link'
import {
  Bell,
  ChevronDown,
  Home,
  LayoutDashboard,
  LogOut,
  Settings,
  Users,
} from 'lucide-react'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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

export default function HomePage() {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-center h-16 border-b border-gray-200 dark:border-gray-700">
          <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Agentic Keboola
          </span>
        </div>
        <nav className="mt-6">
          <Link
            href="/"
            className="flex items-center px-4 py-2 mt-2 text-gray-700 bg-gray-100 dark:bg-gray-700 dark:text-gray-200"
          >
            <Home className="w-5 h-5 mr-3" />
            Home
          </Link>
          <Link
            href="/dashboard"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <LayoutDashboard className="w-5 h-5 mr-3" />
            Dashboard
          </Link>
          <Link
            href="/agents"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Users className="w-5 h-5 mr-3" />
            Agents
          </Link>
          <Link
            href="/tools"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Users className="w-5 h-5 mr-3" />
            Tools
          </Link>
          <Link
            href="/settings"
            className="flex items-center px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <Settings className="w-5 h-5 mr-3" />
            Settings
          </Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
            Welcome to Agentic Keboola
          </h1>
          <div className="flex items-center">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="ml-2 flex items-center gap-2">
                  <Avatar>
                    <AvatarImage src="/placeholder-avatar.jpg" alt="User" />
                    <AvatarFallback>JD</AvatarFallback>
                  </Avatar>
                  <span>John Doe</span>
                  <ChevronDown className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Profile</DropdownMenuItem>
                <DropdownMenuItem>Settings</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </header>

        {/* Home Content */}
        <div className="p-12 space-y-8">
          {/* Introductory Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-blue-600">
                  Define Intent
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Simply articulate your goals—from financial optimization to inventory management. Our platform translates your objectives into actionable workflows automatically.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-green-600">
                  Leverage Primitives
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Build powerful solutions using our core components—extractors, writers, transformations, orchestrators, and storage—combined intelligently to create autonomous workflows.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-purple-600">
                  Visualize Actions
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Monitor agent behavior through dynamic action graphs, providing real-time visual mapping of processes and identifying optimization opportunities.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl font-semibold text-orange-600">
                  Evolve & Customize
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4">
                <p className="text-gray-700 dark:text-gray-300">
                  Adapt and refine your automation as needs change. Agents learn from historical data while you maintain full control to customize workflows.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Value Proposition */}
          <Card className="bg-gradient-to-r from-blue-500 to-purple-600 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Realize Concrete Value</h3>
              <p className="text-lg opacity-90">
                Transform your data from a passive resource into an active, value-generating force. Let intelligent agents handle repetitive tasks while you focus on innovation, strategy, and growth.
              </p>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}