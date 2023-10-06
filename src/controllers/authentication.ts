import type { Request,Response } from 'express';
import { getUserByEmail, updateUser } from '../user/user.service';
import { authentication, random } from '../utils/crypto.server';
import * as UserService from "../user/user.service";


export const login = async (request: Request, response: Response) => {
    try {
        const { email,password } = request.body;

        if (!email || !password) {
            return response.status(400);
        }

        const user = await getUserByEmail(email);

        if (!user) {
            return response.status(400);
        }

        const expectedHash = authentication(user.salt, password);

        if (user.password !== expectedHash) {
            return response.status(403);
        }

        const salt = random();
        user.sessionToken = authentication(salt, user.id.toString());

        const id: number = parseInt(request.params.id,10);
        await UserService.updateUser(user,id);
        response.cookie('SERVERCONFIG-AUTH', user.sessionToken, { domain: 'localhost', path: '/' });

        return response.status(200).json(user).end();
    } catch (error) {
        return response.status(500).json(error);
    }
};