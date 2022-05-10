import React from "react";
import Lottie from 'react-lottie-player'
import { useNavigate } from 'react-router-dom';
import "./Login.scss";

import Header from "../../components/Header/Header"
import lottieJson from '../../media/lottie.json';


const Login: React.FC = () => {

  let navigate: any = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const room = new Date().getTime(); // Generating random room code
    navigate(`/codebox?room=${room}`);
  };


  return (
    <div className="login-container">
      <Header />
      <main>
        <div className="animation">
          <Lottie animationData={lottieJson} loop play speed={2} />
        </div>
        <div className="btn-container">
          <form onSubmit={handleSubmit}>
            <input type="submit" value="Get started" />
          </form>
        </div>
      </main>
    </div>
  );
}
export default Login;