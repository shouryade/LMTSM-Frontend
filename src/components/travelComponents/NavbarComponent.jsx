import { Navbar } from "flowbite-react";
import { NavLink, useNavigate } from "react-router-dom";
import { Button } from "flowbite-react";
import logo from "/logo.svg";
import React from "react";

export default function NavbarComponent() {
  const navigate = useNavigate();

  function isAuthenticated() {
    const token = localStorage.getItem("jwt");
    return !!token;
  }

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    window.location.reload(true);
  };

  return (
    <Navbar
      fluid={true}
      rounded={true}
      className="!bg-transparent"
      style={{
        fontSize: "1rem",
      }}
    >
      <Navbar.Brand href="/">
        <img src={logo} className="my-3 h-10 sm:h-[4rem]" alt="LMTSM Logo" />
      </Navbar.Brand>
      <div className="flex md:order-2 ">
        {isAuthenticated() ? (
          <Button className="!bg-[#c01313]" onClick={handleLogout}>
            Sign out
          </Button>
        ) : (
          <Button
            className="!bg-[#c01313]"
            onClick={() => navigate("/dashboard")}
          >
            Get started
          </Button>
        )}
      </div>
    </Navbar>
  );
}
