import type { User } from './user'

export interface Account {
  accountId: number
  cardNumber: string
  balance: number
  status: 'ACTIVE' | 'SUSPENDED'
  createdAt: Date
  user: User 
}