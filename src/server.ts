import express from 'express';
import authRouter from './Routes/Auth.routes';

const server = express();

//middlewares
server.use(express.json())

//routes
server.use("/auth", authRouter)


export default server;