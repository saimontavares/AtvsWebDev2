import { PrismaClient } from "../../generated/prisma";

export type IncDto = Pick<PurchaseItem, 'productId'>;