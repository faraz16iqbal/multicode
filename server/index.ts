import cors from "cors";
import express, { Request, Response } from 'express';
import http from 'http';
import { Server } from 'socket.io';

import { addUser, usersInRoom, removeUser, findUser } from './helpers/Users'
import { AddUserObject, User } from './utils/interfaces'

const PORT: number = +(process.env.PORT)! || 5000;
const app: express.Application = express()
app.set('port', PORT)

const server: http.Server = http.createServer(app);

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

require('dotenv').config();

app.use(function (req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
	res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
	res.header(
		"Access-Control-Allow-Headers",
		"Origin,X-Requested-With,Content-Type,Accept,content-type,application/json"
	);
	next();
});

// Socket Logic
const io = new Server(server, {
	cors: {
		origin: [`${process.env.CLIENT}`],
		methods: ["GET", "POST"],
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

		socket.on("sendText", (text) => {
			const user: User | undefined = findUser(socket.id);
			if (user)
				socket.broadcast.to(user.room).emit("text", text);
		});

		socket.on("sendModeValue", (mode) => {
			const user: User | undefined = findUser(socket.id);
			if (user)
				socket.broadcast.to(user.room).emit("changeMode", mode);
		});

		socket.on("sendThemeValue", (theme) => {
			const user: User | undefined = findUser(socket.id);
			if (user) {
				console.log("user room code", user.room);
				socket.broadcast.to(user.room).emit("changeTheme", theme);
			}
		});

		socket.on("disconnect", () => {
			console.log("User has disconnected");
			const user: User | undefined = removeUser(socket.id);
			if (user) {
				io.to(user.room).emit("notification", {
					text: `${user.name} has left`,
					type: "disconnect",
				});

				io.to(user.room).emit("roomData", {
					room: user.room,
					users: usersInRoom(user.room),
				});
			}
		});

	});

});

app.get("/", (req: Request, res: Response) => {
	res.send("<h2>Server for multicode application</h2>")
})

server.listen(PORT, () => {
	console.log(`Server listening on port: ${PORT}`);
});


