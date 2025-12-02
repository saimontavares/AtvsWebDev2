import { Product } from "../../generated/prisma"

export type CreateProductDto = Pick<
  Product,
  "name" | "description" | "stock" | "price"
>
