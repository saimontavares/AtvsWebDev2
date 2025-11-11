import { compare } from "bcryptjs";
import { PrismaClient, User } from "../../generated/prisma"
import { LoginDto } from "./auth.types";

const prisma = new PrismaClient()

export const getUser = async (id: string): Promise<User | null> => {
    if(!id) return null;
    return await prisma.user.findUnique({where: {id}});
}

export const getUsers = async (): Promise<User[]> => {
    return await prisma.user.findMany();
}

export const checkCredentials = async (data: LoginDto): Promise<User | null> =>{
    const user = await prisma.user.findFirst({where: {
        email: data.email
    }})
    if(!user) return null
    const ok = await compare(data.password, user.password)
    if(ok) return user;
    return null;
}