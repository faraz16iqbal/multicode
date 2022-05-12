import React from "react";
import "./UsersList.scss";

import User from "../User/User";
import { UserInterface } from "../../interfaces";

type props = {
  users: Array<UserInterface>
}

const UsersList: React.FC<props> = ({ users }) => {
  return (
    <div className="users">
      {users &&
        users.map((user) => (
          <User key={user.name} user={user} />
        ))}
    </div>
  );
}
export default UsersList;