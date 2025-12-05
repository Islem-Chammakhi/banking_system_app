import type { Account } from './account'

export interface Transaction {
  id: number
  amount: number
  timestamp: Date
  status: 'PENDING' | 'COMPLETED' | 'FAILED'
  description?: string
  senderAccount: Account      
  receiverAccount: Account    
}