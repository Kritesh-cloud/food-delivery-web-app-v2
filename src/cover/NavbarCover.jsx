import React from "react";
import { NavbarProvider } from "../context/NavbarContext";
import Navbar from "../general/Navbar";

const NavbarCover = () => {
  return (
    <NavbarProvider>
      <Navbar />
    </NavbarProvider>
  );
};

export default NavbarCover;
