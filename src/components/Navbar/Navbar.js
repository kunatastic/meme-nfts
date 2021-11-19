import React from "react";
import "./navbar.css";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const buttonData = [
    { href: "/", text: "Home" },
    { href: "/create", text: "Create" },
    { href: "/dashboard", text: "Dashboard" },
  ];

  // get the route
  const location = useLocation();

  return (
    <nav className="border-b-2 py-8 px-64 bg-gray-700">
      <div className="flex navbar-flex">
        <div className="flex-none">
          <h1 className="text-white text-2xl font-bold">
            <Link to="/" className="text-white">
              <span className="font-bold">NFTMinters</span>
            </Link>
          </h1>
        </div>
        <div class="flex-none">
          <div className="flex">
            {buttonData.map((button) => location.pathname !== button.href && NavButton(button))}
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavButton = (props) => {
  const { href, text } = props;
  return (
    <div className="flex-none">
      <Link to={href}>
        <button className="bg-gray-800 text-white mx-4 px-4 py-2 w-32 rounded-full">{text}</button>
      </Link>
    </div>
  );
};

export default Navbar;
