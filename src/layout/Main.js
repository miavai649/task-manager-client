import React from "react";
import { Outlet } from "react-router-dom";
import MyNavbar from "../Shared/Navbar/MyNavbar";

const Main = () => {
  return (
    <div>
      <MyNavbar></MyNavbar>
      <Outlet></Outlet>
    </div>
  );
};

export default Main;
