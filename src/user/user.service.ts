import { db } from "../utils/db.server";

type User = {
    id: number;
    fullName: string;
    emailAddress: string;
};

export const listUsers = async (): Promise<User[]> => {
    return db.user.findMany({
        select: {
            id: true,
            fullName: true,
            emailAddress: true
        },
    });
}

export const getUser = async (id: number): Promise<User | null> => {
    return db.user.findUnique({
        where: {
            id,
        },
        select: {
            id:true,
            fullName: true,
            emailAddress: true
        }
    });
};

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    const {fullName, emailAddress} = user;
    return db.user.create({
        data: {
            fullName,
            emailAddress,
        },
        select: {
            id: true,
            fullName: true,
            emailAddress: true
        }
    });
};

export const updateUser = async (user: Omit<User, "id">, id: number): Promise<User> => {
    const {fullName, emailAddress} = user;
    return db.user.update({
        where: {
            id,
        },
        data: {
            fullName,
            emailAddress,
        },
        select: {
            id: true,
            fullName: true,
            emailAddress: true,
        }
    });
};

export const deleteUser = async (id: number): Promise<void> => {
    await db.user.delete({
        where: {
            id,
        }
    });
};