export type CartItem = {
	id: string
    createdAt: string
    updatedAt: string
	purchaseId: string
	productId: string
	quantity: number
}

export type CartDto = {
    id: string
    userId: string
    status: number
    purchaseItems: CartItem[]
}