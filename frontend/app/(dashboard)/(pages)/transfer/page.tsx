'use client'

import { mockData } from '@/data/mockData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { MultiForm } from './components/multi-form'

export default function TransferPage() {

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-xl font-bold">Transfer money</h1>
        <p className="text-muted-foreground">
          Make a new transfer to another account now
        </p>
      </div>

      {/* transactions table */}
      <Card>
        <CardContent>
          <MultiForm/>
        </CardContent>
      </Card>
    </div>
  )
}
