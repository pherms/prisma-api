import express from 'express';
import type { Request,Response} from 'express';
import {body,validationResult} from 'express-validator';
import { authentication, random } from '../utils/crypto.server';

import * as UserService from "./user.service";

export const UserRouter = express.Router();

// Get list of all users
UserRouter.get("/", async (request: Request, response: Response) => {
    try {
        const Users = await UserService.listUsers()
        return response.status(200).json(Users)
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// Get single user by id
UserRouter.get("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id,10);
    try {
        const user = await UserService.getUser(id)
        if (user) {
            return response.status(200).json(user)
        }
        return response.status(404).json("User could not be found")
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// POST: Create a new user
// Params: fullName and emailAddress
UserRouter.post("/", body("fullName").isString(),body("emailAddress").isString(),body("userName").isString(),body("password").isString(), async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    try {
        const user = request.body;
        const newUser = await UserService.createUser(user);
        return response.status(201).json(newUser);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// PUT: Update existing user
// Params: fullName and emailAddress
UserRouter.put("/:id", body("fullName").isString(), body("emailAddress").isString(),body("userName").isString(), async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    const id: number = parseInt(request.params.id,10);
    try {
        const user = request.body;
        const updatedUser = await UserService.updateUser(user,id);
        return response.status(200).json(updatedUser);
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});

// DELETE: Delete existing user
UserRouter.delete("/:id", async (request: Request, response: Response) => {
    const id: number = parseInt(request.params.id,10);
    try {
        await UserService.deleteUser(id);
        return response.status(204).json("User is succesvol verwijderd");
    } catch (error: any) {
        return response.status(500).json(error.message);
    }
});