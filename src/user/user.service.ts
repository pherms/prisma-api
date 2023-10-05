import { authentication, random } from "../utils/crypto.server";
import { db } from "../utils/db.server";

type User = {
    id: number;
    fullName: string;
    emailAddress: string;
    userName: string;
    password: string;
    salt: string;
    sessionToken: string;
    isActive: boolean;
    forgotPassword: string;
};

export const listUsers = async (): Promise<User[]> => {
    return db.user.findMany({
        select: {
            id: true,
            fullName: true,
            emailAddress: true,
            userName: true,
            password: true,
            salt: true,
            sessionToken: true,
            isActive: true,
            forgotPassword: true,
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
            emailAddress: true,
            userName: true,
            password: true,
            salt: true,
            sessionToken: true,
            isActive: true,
            forgotPassword: true,
        }
    });
};

export const getUserByEmail = async (emailAddress: string): Promise<User | null> => {
    return db.user.findFirst({
        where: {
            emailAddress: emailAddress
        },
        select: {
            id:true,
            fullName: true,
            emailAddress: true,
            userName: true,
            password: true,
            salt: true,
            sessionToken: true,
            isActive: true,
            forgotPassword: true,
        }
    });
};

// export const getUserBySessiontoken = async (sessionToken: string): Promise<User | null> => {
//     return db.user.findFirst({
//         where: {
//             sessionToken: authentication.sessionToken
//         },
//         select: {
//             id:true,
//             fullName: true,
//             emailAddress: true,
//             userName: true,
//             password: true,
//             salt: true,
//             sessionToken: true,
//             isActive: true,
//             forgotPassword: true,
//         }
//     });
// };

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
    const {fullName, emailAddress, userName, password, salt, sessionToken, isActive, forgotPassword,} = user;
    const generatedSalt = random();
    user.salt = generatedSalt;
    user.password = authentication(generatedSalt, user.password);
    
    return db.user.create({
        data: {
            fullName,
            emailAddress,
            userName,
            password,
            salt,
            sessionToken,
            isActive,
            forgotPassword,
        },
        select: {
            id: true,
            fullName: true,
            emailAddress: true,
            userName: true,
            password: true,
            salt: true,
            sessionToken: true,
            isActive: true,
            forgotPassword: true,
        }
    });
};

export const updateUser = async (user: Omit<User, "id">, id: number): Promise<User> => {
    const {fullName, emailAddress, userName, password, salt, sessionToken, isActive, forgotPassword} = user;
    return db.user.update({
        where: {
            id,
        },
        data: {
            fullName,
            emailAddress,
            userName,
            password,
            salt,
            sessionToken,
            isActive,
            forgotPassword,
        },
        select: {
            id: true,
            fullName: true,
            emailAddress: true,
            userName: true,
            password: true,
            salt: true,
            sessionToken: true,
            isActive: true,
            forgotPassword: true,
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