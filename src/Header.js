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
      <div className="header__wrapper">
        <h2>MoonBase.</h2>
        {!!user && (
          <button
            className="ui gradient__btn button logout"
            onClick={logoutUser}
          >
            LOGOUT
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
