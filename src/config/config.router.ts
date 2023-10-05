import express from 'express';
import type { Request,Response } from 'express';
import fs from 'fs-extra';
import { body,validationResult } from 'express-validator';

export const ConfigRouter = express.Router();
const configfile = "src/config-example.json";

ConfigRouter.get("/", async (request: Request, response: Response) => {
    try {
        const config = fs.readJsonSync(configfile);
        response.status(200).json(config);
    } catch (error: any) {
        response.status(500).json(error.message);
    }
});

ConfigRouter.post("/", body("filetype").isString(), body("backuppath").isString(), body("logfilepath").isString(), body("scriptspath").isString(), body("apiurl").isString(), body("sourcesLocation").isString(), body("compression").isString(), body("backupserver").isString(), body("copycommand").isString(), body("remotefilepath").isString(), body("mailserver").isString(), body("mailRecipient").isString(), body("mailSender").isString(), body("debug").isBoolean(), body("hostType").isString(), body("timerUnits").isString(), body("servicesToInstall").isString(), body("servicesToCopy").isString(), async (request: Request, response: Response) => {
    const errors = validationResult(request);
    if (!errors.isEmpty()) {
        return response.status(400).json({ errors: errors.array() });
    }

    try {
        const config = fs.readJsonSync(configfile);
        const updatedConfig = { ...config, ...request.body };
        console.log(updatedConfig);
        fs.writeJsonSync(configfile,updatedConfig);
        response.status(200).json(updatedConfig);
    } catch (error: any) {
        response.status(500).json(error.message);
    }
});