import cors from "cors";
import express from 'express';
import http from 'http';
import { Server, Socket } from 'socket.io';

// TODO:
// add sockets
// Start making rooms

const PORT: Number = 5000;
const app: express.Application = express()
app.set('port', PORT)

const server: http.Server = http.createServer(app);

// Middlewares
app.use(cors({
    allowedHeaders: ['Content-Type'],
    origin: ['http://localhost:3000']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Socket Logic
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000']
    }
});

io.on('connection', (socket) => {
    console.log("User Connected " + socket.id)
});


server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


