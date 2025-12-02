import api from "@/utils/api";
import Cart from "@/views/cart/Cart";
import { ProductDto } from "@/views/products/Product.types";

async function CartPage() {
  try {
    const res = await api.get("/product");
    const products: ProductDto[] = res.data;
    console.log("Carrinho", products);
    return <Cart products={products} />;
  } catch (err) {
    console.error("Erro ao buscar produtos:", err);
    return <Cart products={[]} />;
  }
}

export default CartPage;
