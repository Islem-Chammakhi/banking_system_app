import { Wallet, Receipt, ArrowUpRight, ArrowDownLeft } from "lucide-react"

import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Wallet className="h-5 w-5 text-muted-foreground" />
            <CardDescription>Total Balance</CardDescription>
          </div>
          <CardTitle className="text-xl font-semibold font-mono tabular-nums @[250px]/card:text-2xl">
            1,409 <span>TND</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Current available balance</div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-muted-foreground" />
            <CardDescription>Total Transactions</CardDescription>
          </div>
          <CardTitle className="text-xl font-semibold font-mono tabular-nums @[250px]/card:text-2xl">
            36
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">
            N° of completed transactions
          </div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowUpRight className="h-5 w-5 text-muted-foreground" />
            <CardDescription>Money Sent</CardDescription>
          </div>
          <CardTitle className="text-xl font-semibold font-mono tabular-nums @[250px]/card:text-2xl">
            45,678 <span>TND</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Total amount transferred</div>
        </CardFooter>
      </Card>
      
      <Card className="@container/card">
        <CardHeader>
          <div className="flex items-center gap-2">
            <ArrowDownLeft className="h-5 w-5 text-muted-foreground" />
            <CardDescription>Money Received</CardDescription>
          </div>
          <CardTitle className="text-xl font-semibold font-mono tabular-nums @[250px]/card:text-2xl">
            13,571 <span>TND</span>
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex-col items-start gap-1.5 text-sm">
          <div className="text-muted-foreground">Total amount received</div>
        </CardFooter>
      </Card>
    </div>
  )
}