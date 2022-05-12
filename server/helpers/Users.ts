import { User } from "../utils/interfaces";
const users: Array<User> = [];

const addUser = (body: User) => {

    let { id, name, room } = body;

    if (name) {
        name = name.trim();
        const user = { id, name, room };
        users.push(user);
        return { user };
    } else {
        return { error: "Enter a valid name" };
    }
};

const removeUser = (id: string) => {
    const index: number = users.findIndex((user) => user.id === id);
    if (index !== -1) {
        return users.splice(index, 1)[0];
    }
};

const findUser = (id: string): User | undefined => users.find((user) => user.id === id);

const usersInRoom = (room: string) => users.filter((user) => user.room === room);

export { addUser, removeUser, findUser, usersInRoom };