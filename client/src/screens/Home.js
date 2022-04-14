import React from 'react'
import API from "../utils/API";
import { useNavigate } from 'react-router-dom';

const Home = () => {
    let navigate = useNavigate();

    const createRoomHandler = async () => {
        const { data } = await API.post("/api/room/");
        if (data) {
            console.log("New room round");
            if (!data.error) {
                navigate(`/room/${data.roomId}`)
            }
        }
    };
    return (
        <>
            <div>Home</div>
            <button onClick={createRoomHandler}>Create Room</button>
        </>

    )
}

export default Home