import ProductDetails from "@/views/products/item/ProductDetails";

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_DOCKER_API}/product/${id}`,
  );
  const product = await response.json();
  return <ProductDetails product={product}></ProductDetails>;
}

export default ProductPage;
