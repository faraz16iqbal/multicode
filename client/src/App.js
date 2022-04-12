import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const App = () => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const newSocket = io(`http://localhost:5000`);
    setSocket(newSocket);
    newSocket.on("connect", () => {
      console.log("Connected");
    });
  }, [setSocket]);

  return (
    <div className="App">
      <header className="App-header">Learn React</header>
    </div>
  );
};

export default App;
