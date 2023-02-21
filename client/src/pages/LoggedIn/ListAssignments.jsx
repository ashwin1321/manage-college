import React, { useEffect } from "react";
import Navbar from "../../component/Navbar";
import axios from "axios";
import Sidebar from "../../component/Sidebar";
import Assignments from "../../component/dashboard/Assignments";

const ListSubjects = () => {
  return (
    <div>
      <Navbar position="fixed w-full" />
      <div className="flex flex-row">
        <div className="w-72 h-screen overflow-auto">
          <Sidebar />
        </div>
        <div className=" w-full h-screen overflow-auto">
          <Assignments />
        </div>
      </div>
    </div>
  );
};

export default ListSubjects;
