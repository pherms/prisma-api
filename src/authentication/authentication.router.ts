import express from 'express';
import type { Request, Response } from 'express';
import {body,validationResult} from 'express-validator';

import { login } from '../controllers/authentication';

import * as AuthenticationService from '../controllers/authentication';
import { UserRouter } from '../user/user.router';
import * as UserService from '../user/user.service';

export const AuthenticationRouter = express.Router();

AuthenticationRouter.put("/", body("userName").isString(),body("password").isString(), async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json(errors);
    }
    
    try {
        console.log(request.body);
        const user = request.body();
        const id: number = parseInt(request.params.id,10);
        const loggedInUser = await UserService.updateUser(user,id);
        return response.status(200).json(loggedInUser);
    } catch (error) {
        return response.status(500).json(error);
    }
})