export interface UserInterface {
    id: string,
    name: string,
    room: string
}

export interface ConfigInterface {
    mode: { name: string },
    theme: string,
    lineNumbers: Boolean
};