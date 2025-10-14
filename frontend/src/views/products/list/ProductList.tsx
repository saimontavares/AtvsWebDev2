import React from 'react'
import ProductCard from './ProductCard'
import { ProductDto } from '../Product.types'

interface ProductListProps {
    products: ProductDto[]
}

function ProductList({ products }: ProductListProps){
    return (
        <div className='grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4' >
            {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
    )
}

export default ProductList