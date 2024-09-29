import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";

function NavbarComponent() {
  // State za praćenje prisustva korisničkog podatka u localStorage
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.hasOwnProperty('redux_user'));

  // Provera localStorage na početku
  useEffect(() => {
    setIsLoggedIn(localStorage.hasOwnProperty('redux_user'));
  }, []);

  return (
    <div className="container mx-auto flex items-center h-[100px] justify-between">
      <h1 className="text-blue-600 text-4xl uppercase font-extrabold">Redux</h1>
      <ul className="flex items-center gap-5 text-blue-300 text-[20px]">
        <li>
          <NavLink to={"/"}>Home</NavLink>
        </li>
        {isLoggedIn ? (
          <li>
            <NavLink to={"/profile"}>Profile</NavLink>
          </li>
        ) : (
          <li>
            <NavLink to={"/register"}>Register</NavLink>
          </li>
        )}
      </ul>
    </div>
  );
}

export default NavbarComponent;
