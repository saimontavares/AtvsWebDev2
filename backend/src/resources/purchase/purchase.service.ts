import { PrismaClient } from "../../generated/prisma";
import { PurchaseStatus } from "./purchase.constants";

const prisma = new PrismaClient();

export const getCart = async (userId: string): Promise<Purchase> => {
    let cart = await prisma.purchase.findFirst({
        where: {
            userId,
            status: PurchaseStatus.cart
        }
    });
    if(!cart) {
        cart = await prisma.purchase.create({
            data: {
                userId,
                status: PurchaseStatus.cart
            }
        });
    }
    return cart;
}

const getCartItems = (userId: string): Promise<PurchaseItem[]> => {
    const cart = getCart(userId);
    const prisma.purchaseItem.findMany({
        where: {
            purchaseId: cart.id
        }
    })
}