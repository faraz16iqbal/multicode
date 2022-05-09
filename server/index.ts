import cors from "cors";
import express from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { addUser, usersInRoom } from './helpers/Users'
import { AddUserObject } from './utils'

const PORT: Number = 5000;
const app: express.Application = express()
app.set('port', PORT)

const server: http.Server = http.createServer(app);

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Socket Logic
const io = new Server(server, {
    cors: {
        origin: ['http://localhost:3000'],
        credentials: true,
    },
    allowEIO3: true,
});

io.on('connection', (socket) => {

    socket.on("join", ({ name, room }, callback) => {
        console.log("User has joined");

        const res: AddUserObject = addUser({ id: socket.id, name, room });


        if (res.error) {
            return callback(res.error);
        } else if (res.user) {
            socket.join(res.user.room);
            console.log("user id", socket.id);

            // For notifications
            socket.broadcast.to(res.user.room).emit("notification", {
                text: `${res.user.name} has joined!`,
                type: "connect",
            });

            io.to(res.user.room).emit("roomData", {
                room: res.user.room,
                users: usersInRoom(res.user.room),
            });
            callback();
        }
    });

});

server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


