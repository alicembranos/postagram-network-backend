import express from 'express';
import authRouter from './Routes/Auth.routes';
import postRouter from './Routes/Post.routes';

const server = express();

//middlewares
server.use(express.json())

//routes
server.use("/auth", authRouter)
server.use("/api-post", postRouter)


export default server;