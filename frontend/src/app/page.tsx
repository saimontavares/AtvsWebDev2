import ProductList from "@/views/products/list/ProductList"
import { ProductDto } from "@/views/products/Product.types"

async function Home() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/products`)
  const products : ProductDto[] = await res.json()
  console.log(products)
  return <ProductList products={products} />
}

export default Home