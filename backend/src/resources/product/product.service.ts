import { PrismaClient, Product } from "../../generated/prisma"
import { ProductStatus } from "./product.constants"
import { CreateProductDto } from "./product.types"

const prisma = new PrismaClient()

export const getProducts = async () => {
  return prisma.product.findMany({
    where: {
      status: ProductStatus.active,
    },
  })
}

export const createProduct = async (
  product: CreateProductDto,
): Promise<Product> => {
  return prisma.product.create({
    data: {
      ...product,
      status: ProductStatus.active,
    },
  })
}

export const findProductByName = async (name: string) : Promise<Product | null> => {
  return prisma.product.findFirst({ where: { name } })
}

export const removeProduct = async (id: string): Promise<Product> => {
    return prisma.product.delete({
        where: { id }
    })
} // TO-DO: versão de retorno prof,
