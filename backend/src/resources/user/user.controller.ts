import { Request, Response } from "express"
import { CreateUserDto } from "./user.types"
import { createUser } from "./user.service"

const index = async (req: Request, res: Response) => {}
const create = async (req: Request, res: Response) => {
  const data = req.body as CreateUserDto
  try {
    const user = await createUser(data)
    res.json(user)
  } catch (err) {
    res.json(err)
  }
}

export default { index, create }
