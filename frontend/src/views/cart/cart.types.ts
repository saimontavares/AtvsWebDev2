export type CartItem = {
	id: string
	purchaseId: string
	productId: string
	quantity: SVGAnimatedNumberList
}

export type CartDto = {
    id: string
    userId: string
    status: number
    purchaseItems: CartItem[]
}