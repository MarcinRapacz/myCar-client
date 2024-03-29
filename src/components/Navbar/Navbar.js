import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import "./Navbar.scss";
import { useSelector, useDispatch } from "react-redux";
import { FaBars } from "react-icons/fa";

// Actions
import { logoutUser } from "../../actions/authenticationActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const auth = useSelector(s => s.auth);
  const [show, setShow] = useState(false);

  const showMenu = () => setShow(true);
  const hideMenu = () => setShow(false);

  const handleLogout = () => dispatch(logoutUser());

  return (
    <nav className="Navbar">
      <h1 className="Navbar__header">myCar app</h1>

      <div className="Nabvar__container">
        <ul
          className={`Navbar__list ${show && "Navbar__list--show"}`}
          onClick={hideMenu}
        >
          {auth.id ? (
            <>
              <li className="Navbar__list-item">
                <NavLink className="Navbar__link" to="/car">
                  Moje pojazdu
                </NavLink>
              </li>
              <li className="Navbar__list-item">
                <Link
                  className="Navbar__link"
                  to="/login"
                  onClick={handleLogout}
                >
                  Wyloguj
                </Link>
              </li>
            </>
          ) : (
            <>
              <li className="Navbar__list-item">
                <NavLink className="Navbar__link" to="/login">
                  Zaloguj się
                </NavLink>
              </li>
              <li className="Navbar__list-item">
                <NavLink className="Navbar__link" to="/register">
                  Utwórz konto
                </NavLink>
              </li>
            </>
          )}
        </ul>

        <FaBars className="Navbar__hamburger" onClick={showMenu} />
      </div>
    </nav>
  );
};

export default Navbar;
