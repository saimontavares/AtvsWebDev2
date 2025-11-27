'use client'
import React, { useContext, useMemo, useState } from 'react'
import CartItem from './CartItem'
import { ProductDto } from '../../views/products/Product.types'
import { TextInput } from 'flowbite-react'
import { CartContext } from '@/providers/CartProvider/CartProvider'

interface CartProps {
    products: ProductDto[]
}

function Cart({ products }: CartProps) {
    const { cartProducts } = useContext(CartContext)
    const [searchString, setSearchString] = useState('')
    const filteredProducts = useMemo(
        () =>
            products.filter((p) =>
                p.name.toLowerCase().includes(searchString.trim().toLowerCase()) && cartProducts[p.id]
            ),
        [searchString, products, cartProducts]
    );
    const total = filteredProducts.reduce((acc, p) => {
        const quantity = cartProducts[p.id] || 0;
        return acc + parseFloat(p.price) * quantity;
    }, 0);
    return (
        <div>
            <div className='flex justify-between mb-2 items-center'>
                <h1 className='text-2xl font-bold'>Carrinho</h1>
                <TextInput type="text" value={searchString} onChange={(e) => setSearchString(e.target.value)} placeholder="Busque Produtos" />
            </div>
            <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' >
                {filteredProducts.map(p => <CartItem key={p.id} product={p} />)}
            </div>
            <div className='mt-2 text-right'>
                Total: R$ {total.toFixed(2)}
            </div>
        </div>
    )
}

export default Cart