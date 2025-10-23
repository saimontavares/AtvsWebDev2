import { ProductDto } from "../Product.types";

interface ProductDetailProps {
    product: ProductDto
}

function ProductDetails({product} :ProductDetailProps){
    return (
        <div>
            <div className="text-2xl font-bold">{product.name}</div>
            <div>{product.description}</div>
            <div><span className="font-bold">Preço:</span> R$ {parseFloat(product.price).toFixed(2)}</div>
            <div><span className="font-bold">Estoque:</span> {product.stock}</div>
        </div>
    )
}
export default ProductDetails