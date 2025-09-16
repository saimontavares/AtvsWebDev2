import { PrismaClient } from "../../generated/prisma";

const prisma = new PrismaClient()

export const getProducts = async() =>{
    return prisma.product.findMany({
        where: {
            status: 1
        }
    })
}