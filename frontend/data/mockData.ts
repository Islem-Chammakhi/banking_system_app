import { User, Account, Transaction } from '@/types'

// Users Data
export const usersData: User[] = [
  {
    userId: 1,
    cin: "12345678",
    firstName: "Mohamed",
    lastName: "Ben Ali",
    phone: "+216 12 345 678",
    email: "mohamed.benali@email.com",
    createdAt: new Date('2023-01-15'),
    account: {} as Account // Will be populated below
  },
  {
    userId: 2,
    cin: "87654321",
    firstName: "Fatima",
    lastName: "Dridi",
    phone: "+216 98 765 432",
    email: "fatima.dridi@email.com",
    createdAt: new Date('2023-02-20'),
    account: {} as Account
  },
  {
    userId: 3,
    cin: "11223344",
    firstName: "Ahmed",
    lastName: "Trabelsi",
    phone: "+216 55 444 333",
    email: "ahmed.trabelsi@email.com",
    createdAt: new Date('2023-03-10'),
    account: {} as Account
  },
  {
    userId: 4,
    cin: "44332211",
    firstName: "Sarah",
    lastName: "Mansouri",
    phone: "+216 77 888 999",
    email: "sarah.mansouri@email.com",
    createdAt: new Date('2023-04-05'),
    account: {} as Account
  }
]

// Accounts Data
export const accountsData: Account[] = [
  {
    accountId: 1,
    cardNumber: "1234 5678 9012 3456",
    balance: 12500.75,
    status: "ACTIVE",
    createdAt: new Date('2023-01-15'),
    user: usersData[0]
  },
  {
    accountId: 2,
    cardNumber: "9876 5432 1098 7654",
    balance: 8300.25,
    status: "ACTIVE",
    createdAt: new Date('2023-02-20'),
    user: usersData[1]
  },
  {
    accountId: 3,
    cardNumber: "4567 8901 2345 6789",
    balance: 15200.50,
    status: "ACTIVE",
    createdAt: new Date('2023-03-10'),
    user: usersData[2]
  },
  {
    accountId: 4,
    cardNumber: "3210 9876 5432 1098",
    balance: 6700.00,
    status: "ACTIVE",
    createdAt: new Date('2023-04-05'),
    user: usersData[3]
  }
]

// Link accounts to users
usersData[0].account = accountsData[0]
usersData[1].account = accountsData[1]
usersData[2].account = accountsData[2]
usersData[3].account = accountsData[3]

// Transactions Data
export const transactionsData: Transaction[] = [
  {
    id: 1,
    amount: 500.00,
    timestamp: new Date('2024-01-15T10:30:00'),
    status: "COMPLETED",
    description: "Restaurant payment",
    senderAccount: accountsData[0],
    receiverAccount: accountsData[1]
  },
  {
    id: 2,
    amount: 200.00,
    timestamp: new Date('2024-01-14T14:22:00'),
    status: "COMPLETED",
    description: "Groceries",
    senderAccount: accountsData[1],
    receiverAccount: accountsData[2]
  },
  {
    id: 3,
    amount: 1000.00,
    timestamp: new Date('2024-01-13T09:15:00'),
    status: "COMPLETED",
    senderAccount: accountsData[2],
    receiverAccount: accountsData[0]
  },
  {
    id: 4,
    amount: 150.00,
    timestamp: new Date('2024-01-12T16:45:00'),
    status: "PENDING",
    description: "Coffee shop",
    senderAccount: accountsData[3],
    receiverAccount: accountsData[0]
  },
  {
    id: 5,
    amount: 750.00,
    timestamp: new Date('2024-01-11T11:20:00'),
    status: "FAILED",
    description: "Electronics",
    senderAccount: accountsData[0],
    receiverAccount: accountsData[3]
  }
]

// Export all data
export const mockData = {
  users: usersData,
  accounts: accountsData,
  transactions: transactionsData,
}

export default mockData