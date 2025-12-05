import type { Account } from './account'

export interface User {
  userId: number
  cin: string
  firstName: string
  lastName: string
  phone: string
  email: string
  createdAt: Date
  account: Account  
}