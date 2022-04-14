import express from 'express';
import { v4 } from 'uuid';
// import Room from './../models/room.model';

const router: express.Router = express.Router();

router.post('/', async (request: express.Request, response: express.Response) => {
    console.log("Created request for creating room");
    const roomId: string = v4();
    return response.status(201).json({ "error": null, roomId });

});

export = router;

