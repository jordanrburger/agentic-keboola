'use client'

import { useParams } from 'next/navigation'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import MainLayout from '@/components/main-layout'
import ToolsComponent from '@/components/tools-component'

export default function AgentToolsPage() {
  const params = useParams()
  const agentId = params?.id

  return (
    <MainLayout>
      <div className="p-6 text-gray-900 dark:text-gray-100">
        <Card className="bg-white dark:bg-gray-800">
          <CardHeader>
            <CardTitle className="text-gray-800 dark:text-gray-100">
              Select Tools for Agent {agentId}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ToolsComponent agentId={agentId as string} />
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  )
}
