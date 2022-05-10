import React from "react";
import "./User.scss"
import { UserInterface } from "../../interfaces"

type props = {
  user: UserInterface
}

const User: React.FC<props> = ({ user }) => {
  return (
    <div className="user" key={user.id} >
      <span></span> & nbsp;&nbsp;
      {user.name
      }
    </div >
  );
}

export default User