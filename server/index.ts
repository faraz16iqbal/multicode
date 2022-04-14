import cors from "cors";
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

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


// routes
app.use('/api/room', require('./routes/routes.room'));

// Socket Logic
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
    },
    allowEIO3: true,
});

let arr: Array<String> = [];

io.on('connection', (socket) => {
    console.log("User Connected " + socket.id)
    socket.on('joinRoom', (roomId) => {
        console.log(roomId);
        socket.join(roomId);
        return socket.broadcast.to(roomId).emit('userjoined');
    });
    socket.on("setBody", (roomId, msg) => {
        console.log(msg)
        console.log(roomId)
        io.to(roomId).emit("message", msg);
    })
});


server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


