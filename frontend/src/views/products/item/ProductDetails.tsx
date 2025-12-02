import { ProductDto } from "../Product.types";

interface ProductDetailProps {
  product?: ProductDto | null;
}

function ProductDetails({ product }: ProductDetailProps) {
  if (!product) return <div>No product selected</div>;

  return (
    <div>
      <div className="text-2xl font-bold">{product.name}</div>
      <div>{product.description}</div>
      <div>
        <span className="font-bold">Preço:</span> R${" "}
        {Number(product.price ?? 0).toFixed(2)}
      </div>
      <div>
        <span className="font-bold">Estoque:</span> {product.stock ?? 0}
      </div>
    </div>
  );
}
export default ProductDetails;
