import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import http from 'http';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import { UserRouter } from './user/user.router';
import { ConfigRouter } from './config/config.router';
import { AuthenticationRouter } from './authentication/authentication.router';

dotenv.config();

if (!process.env.PORT) {
    process.exit(1);
}

const PORT: number = parseInt(process.env.PORT as string, 10);

const app = express();

app.use(cors({
    credentials: true,
}));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());

app.use(express.json());
app.use("/api/users", UserRouter);
app.use("/api/config",ConfigRouter);
app.use("/auth/login",AuthenticationRouter);

// app.listen(PORT, () => {
//     console.log(`Listening on port ${PORT}`);
// });
const server = http.createServer(app);
server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
});