export type Page =
  | 'home'
  | 'browse'
  | 'product'
  | 'seller'
  | 'chat'
  | 'checkout'
  | 'tracking'
  | 'inspection'
  | 'dispute'
  | 'dashboard'
  | 'sell'
  | 'admin'
  | 'favorites'
  | 'notifications'

export type Navigate = (page: Page, data?: any) => void

export interface Seller {
  id: number
  name: string
  rating: number
  transactions: number
  responseRate: number
  memberSince: string
  isVerified: boolean
  city: string
  bio?: string
}

export interface Product {
  id: number
  title: string
  price: number
  city: string
  condition: string
  conditionLevel: 'excellent' | 'good' | 'fair'
  category: string
  categoryLabel: string
  seller: Seller
  image: string
  images?: string[]
  description?: string
  views?: number
  isFeatured?: boolean
}

export interface Message {
  id: number
  sender: 'buyer' | 'seller' | 'system'
  text?: string
  offer?: { amount: number; status: 'pending' | 'accepted' | 'rejected' }
  time: string
}

export interface Transaction {
  id: string
  product: Product
  status: 'agreed' | 'paid' | 'pickup' | 'transit' | 'delivered' | 'inspection' | 'completed' | 'disputed'
  agreedPrice: number
  deliveryFee: number
  serviceFee: number
  buyer: string
  seller: Seller
  date: string
  estimatedDelivery?: string
}
