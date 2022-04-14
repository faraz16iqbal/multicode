import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import socket from '../utils/socket'

const Room = () => {
    let { id } = useParams();
    const [roomId, setRoomId] = useState(null)
    const [messages, setMessages] = useState([]);
    const [msg, setMsg] = useState("");

    useEffect(() => {
        setRoomId(id)
        socket.emit("joinRoom", roomId);
    }, [id, roomId]);

    useEffect(() => {
        socket.on("message", (message) => {
            setMessages([...messages, message]);
        })
    })

    useEffect(() => {
        socket.on("userjoined", () => {
            console.log("User Joined Room Successfully")
        })
    })

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handling submit")
        socket.emit("setBody", roomId, msg);
        setMsg("");
    }

    const displayChat = () => {

        return messages.map((curMsg, id) => (
            <h2 key={id}> {curMsg} </h2>
        ))
    }
    return (
        <>
            <div>Room</div>
            <p>{id ? id : null}</p>
            <form onSubmit={handleSubmit}>
                <p>Send Message</p>
                <textarea value={msg} rows="4" cols="50" onChange={(e) => setMsg(e.target.value)} />
                <br />
                <input type="submit" value="Submit" />
            </form>
            <br />
            <div>
                {messages ? displayChat() : null}
            </div>
        </>
    )
}

export default Room