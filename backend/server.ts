import express, { Application, Request, Response, NextFunction } from 'express';

// add sockets
// Start making rooms


const app: Application = express();

app.listen(5000, () => console.log("Server running on port 5000"))


