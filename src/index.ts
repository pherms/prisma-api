import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import { UserRouter } from './user/user.router';
import { ConfigRouter } from './config/config.router';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/config",ConfigRouter);

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});