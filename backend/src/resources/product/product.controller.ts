import { Request, Response } from "express"
import {
  createProduct,
  findProductByName,
  getProduct,
  getProducts,
  removeProduct,
} from "./product.service"
import { CreateProductDto } from "./product.types"
import { ReasonPhrases, StatusCodes } from "http-status-codes"

const index = async (req: Request, res: Response) => {
  const products = await getProducts()
  res.json(products)
}
const create = async (req: Request, res: Response) => {
  const product = req.body as CreateProductDto
  try {
    if (await findProductByName(product.name)) {
      return res
        .status(StatusCodes.CONFLICT)
        .json({ message: ReasonPhrases.CONFLICT })
    }
    const newProduct = await createProduct(product)
    res.status(StatusCodes.CREATED).json(newProduct)
  } catch (err) {
    console.error(err)
    res
      .status(StatusCodes.INTERNAL_SERVER_ERROR)
      .json({ message: ReasonPhrases.INTERNAL_SERVER_ERROR })
  }
}

const read = async (req: Request, res: Response) => {
  const { id } = req.params
  if (!id)
    return res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
  const products = await getProduct(id)
  res.json(products)
}

const update = async (req: Request, res: Response) => {}
const remove = async (req: Request, res: Response) => {
  const { id } = req.params
  try {
    if (!id)
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: ReasonPhrases.BAD_REQUEST })
    const product = await removeProduct(id)
    if (!product)
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: ReasonPhrases.NOT_FOUND })
    res.status(StatusCodes.OK).json(product)
  } catch (err) {
    console.error(err)
    res
      .status(StatusCodes.BAD_REQUEST)
      .json({ message: ReasonPhrases.BAD_REQUEST })
  }
}

export default {
  index,
  create,
  read,
  update,
  remove,
}
