import { Request, Response } from "express";
import { IncDto } from "./purchaseItem.types";
import { decPurchaseitem, incPurchaseItem } from "./purchaseItem.service";
import { StatusCodes } from "http-status-codes";

const inc = async (req: Request, res: Response) => {
    const { productId } = req.body as IncDto;
    const userId = req.session.userId;
    if(!userId) return res.status(StatusCodes.UNAUTHORIZED).send("Usuário não autenticado");
    try {
        await incPurchaseItem(userId, productId);
        res.status(StatusCodes.OK).send("O usuário teve o item incrementado com sucesso");
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro ao incrementar o item de compra");
    }
}

const dec = async (req: Request, res: Response) => {
    const { productId } = req.body as IncDto;
    const userId = req.session.userId;
    if(!userId) return res.status(StatusCodes.UNAUTHORIZED).send("Usuário não autenticado");
    try {
        await decPurchaseitem(userId, productId);
        res.status(StatusCodes.OK).send("O usuário teve o item decrementado com sucesso");
    }
    catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send("Erro ao decrementar o item de compra");
    }
}

export default { inc, dec };