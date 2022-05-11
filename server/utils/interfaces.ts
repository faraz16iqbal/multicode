export interface User {
    id: string,
    name: string,
    room: string
}

export interface AddUserObject {
    user?: User,
    error?: String

}