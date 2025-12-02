
import { PrismaClient, User } from "../../generated/prisma";
import { CreateUserDto, UserDto } from "./user.types";
import getEnv from "../../utils/getEnv";
import { genSalt, hash } from "bcryptjs";

const env = getEnv();

const prisma = new PrismaClient()

export const getUsers = async(): Promise<UserDto[]>=>{
    const user = await prisma.user.findMany();
    return user.map(({password, ...user}) => user)
}

export const getUser = async(id?: string): Promise<User | null>=>{
    if(!id) return null;
    return await prisma.user.findFirst({
        where: { id: id }
    });
}

export const createUser = async(data: CreateUserDto): Promise<UserDto> => {
    const salt = await genSalt(env.BCRYPT_ROUNDS)
    const passwd = await hash(data.password, salt)
    const { password, ...user } = await prisma.user.create({ data: {
        ...data,
        password: passwd
    }})
    return user;
}