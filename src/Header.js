import React from "react";
import { logout } from "./firebase/auth";
import { useHistory } from "react-router-dom";
import { useSession } from "./firebase/UserProvider";

function Header() {
  // useHistory gives access to the history instance
  // that we can use to navigate. Gives routing functionality to a component
  const history = useHistory();

  const { user } = useSession();

  const logoutUser = async () => {
    await logout();
    history.push("/login");
  };

  return (
    <header>
      <h2>MoonBase: Projects Dashboard</h2>
      {!!user && (
        <button className="ui secondary button logout" onClick={logoutUser}>
          LOGOUT
        </button>
      )}
    </header>
  );
}

export default Header;
