import crypto from 'crypto';
import * as dotenv from 'dotenv';

dotenv.config();

const secret = "HOGE-BLAUWE-BOMEN";

export const random = () => crypto.randomBytes(256).toString('base64');
export const authentication = (salt: string, password: string) => {
    return crypto.createHmac('sha512', [salt, password].join('/')).update(secret).digest('hex');
};