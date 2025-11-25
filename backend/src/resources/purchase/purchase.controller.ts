import { Request, Response } from "express";
import { ReasonPhrases, StatusCodes } from "http-status-codes";
import { getCart } from "./purchase.service";

const cart = async (req: Request, res: Response) => {
    const userId = req.session.userId;
    if(!userId) return res.status(StatusCodes.UNAUTHORIZED).send(ReasonPhrases.UNAUTHORIZED);
    try {
        const userCart = await getCart(userId);
        res.status(StatusCodes.OK).json(userCart);
    } catch (error) {
        console.log(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).send(ReasonPhrases.INTERNAL_SERVER_ERROR);
    }
}

export default { cart };