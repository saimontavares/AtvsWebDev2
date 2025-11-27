import Cart from "@/views/cart/Cart"
import { ProductDto } from "@/views/products/Product.types"

async function CartPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DOCKER_API}/product`)
  const products : ProductDto[] = await res.json()
  console.log(products)
  return <Cart products={products} />
}

export default CartPage