import { Request, Response } from 'express';
import { createProduct, findProductByName, getProducts, removeProduct } from './product.service';
import { CreateProductDto } from './product.types';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

const index = async(req: Request, res: Response) => {
  const products = await getProducts();
  res.json(products);
}
const create = async(req: Request, res: Response) => {
  const product = req.body as CreateProductDto
  try{
    if (await findProductByName(product.name)){
      return res.status(StatusCodes.CONFLICT).json(ReasonPhrases.CONFLICT)
    }
    const newProduct = await createProduct(product)
    res.status(StatusCodes.CREATED).json(newProduct)
  } catch(err){
    console.error(err)
    res.status(StatusCodes.INTERNAL_SERVER_ERROR)
  }
}

const read = (req: Request, res: Response) => {}
const update = (req: Request, res: Response) => {}
const remove = (req: Request, res: Response) => {
  const {id} = req.params;
  try{
    if (!id) return res.status(StatusCodes.BAD_REQUEST).json(ReasonPhrases.BAD_REQUEST)
    const product = removeProduct(id) // TO-DO tem algo de errado? testar
    res.status(StatusCodes.OK).json(ReasonPhrases.OK)
  }
  catch(err){
    console.error(err)
    res.status(StatusCodes.BAD_REQUEST)
  }
}

export default {
  index,
  create,
  read,
  update,
  remove
};