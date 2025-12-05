'use client'

import { useState } from 'react'
import { Transaction } from '@/types'
import { mockData } from '@/data/mockData'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { TransactionsSkeleton } from './components/transactions-skeleton'

export default function TransactionsPage() {

  // transactions list
  const [transactions, setTransactions] = useState<Transaction[]>(() => {
    return mockData.transactions
  })

  // loading
  const [loading, setLoading] = useState(false) 
  if (loading) { return <TransactionsSkeleton /> }

  return (
    <div className="space-y-6">
      {/* header */}
      <div>
        <h1 className="text-xl font-bold">Transaction History</h1>
        <p className="text-muted-foreground">
          Your recent money transfers and transactions
        </p>
      </div>

      {/* transactions table */}
      <Card>
        <CardHeader>
          <CardTitle>Transaction list</CardTitle>
          <CardDescription>
            {transactions.length} transactions found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {transactions.length === 0 ? (
            <div className="text-center py-6 text-muted-foreground">
              No transactions found
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date & Time</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Counterparty</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {transactions.map((transaction) => (
                  <TransactionRow key={transaction.id} transaction={transaction} currentUserId={1} />
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

// Helper component for each transaction row
function TransactionRow({ 
  transaction, 
  currentUserId 
}: { 
  transaction: Transaction
  currentUserId: number
}) {
  const isSender = transaction.senderAccount.user.userId === currentUserId
  const counterparty = isSender ? transaction.receiverAccount : transaction.senderAccount
  const amountColor = isSender ? "text-destructive" : "text-green-600"
  const amountPrefix = isSender ? "-" : "+"

  return (
    <TableRow>
      <TableCell className="font-medium">
        <div className="flex flex-col">
          <span>{transaction.timestamp.toLocaleDateString()}</span>
          <span className="text-sm text-muted-foreground">
            {transaction.timestamp.toLocaleTimeString()}
          </span>
        </div>
      </TableCell>
      <TableCell>
        <span>
          {isSender ? "Sent" : "Received"}
        </span>
      </TableCell>
      <TableCell className={`font-medium ${amountColor}`}>
        {amountPrefix} {transaction.amount.toFixed(2)} TND
      </TableCell>
      <TableCell>
        {transaction.description || (
          <span className="text-muted-foreground italic">No description</span>
        )}
      </TableCell>
      <TableCell>
        <Badge variant="secondary">
          {transaction.status}
        </Badge>
      </TableCell>
      <TableCell>
        <div className="flex flex-col">
          <span className="font-medium">
            {counterparty.user.firstName} {counterparty.user.lastName}
          </span>
          <span className="text-sm text-muted-foreground">
            •••• •••• •••• {counterparty.cardNumber.slice(-4)}
          </span>
        </div>
      </TableCell>
    </TableRow>
  )
}