declare global {
    namespace NodeJS {
        interface ProcessEnv {
            CLIENT: string;
            NODE_ENV: 'development' | 'production';
        }
    }
}
export { }