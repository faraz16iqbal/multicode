import cors from "cors";
import express from 'express';
import http from 'http';


const PORT: Number = 5001;
const app: express.Application = express()
app.set('port', PORT)

const server: http.Server = http.createServer(app);

// Middlewares
app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// routes
app.use('/api/room', require('./routes/routes.room'));



server.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});


