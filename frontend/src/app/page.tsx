import api from "@/utils/api"
import ProductList from "@/views/products/list/ProductList"
import { ProductDto } from "@/views/products/Product.types"

async function Home() {
  try {
    const res = await api.get('/product')
    const products: ProductDto[] = res.data
    return <ProductList products={products} />
  } catch (err) {
    console.error('Erro ao buscar produtos:', err)
    return <ProductList products={[]} />
  }
}

export default Home