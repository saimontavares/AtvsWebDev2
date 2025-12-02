import { compare } from "bcryptjs"
import { PrismaClient, User } from "../../generated/prisma"
import { LoginDto } from "./auth.types"

const prisma = new PrismaClient()

export const checkCredentials = async (
  data: LoginDto,
): Promise<User | null> => {
  const user = await prisma.user.findFirst({
    where: {
      email: data.email,
    },
  })
  if (!user) return null
  const ok = await compare(data.password, user.password)
  if (ok) return user
  return null
}
