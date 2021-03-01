import React from "react";
import { logout } from "../firebase/auth";
import { useHistory } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";
import { FaUserAlt } from "react-icons/fa";

function Header() {
  // useHistory gives access to the history instance
  // that we can use to navigate. Gives routing functionality to a component
  const history = useHistory();

  const { user } = useSession();

  const logoutUser = async () => {
    await logout();
    history.push("/login");
  };

  console.log(
    "Almost before we knew it, we had left the ground. See more of my work @: robcampbelldev.com"
  );

  return (
    <header>
      <div className="header__wrapper">
        <h2>moonbase.</h2>
        <div className="header__right">
          {!!user && (
            <>
              <p>
                <FaUserAlt /> {user.displayName}
              </p>
              <button
                className="ui gradient__btn button logout"
                onClick={logoutUser}
              >
                logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
