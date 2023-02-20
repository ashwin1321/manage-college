import React, { useEffect } from "react";
import Navbar from "../../component/Navbar";
import axios from "axios";
import Sidebar from "../../component/Sidebar";
import Students from "../../component/dashboard/Students";

const ListSubjects = () => {
  return (
    <div>
      <Navbar position="fixed w-full" />
      <div className="grid grid-cols-6 ">
        <div className=" col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5">
          <Students />
        </div>
      </div>
    </div>
  );
};

export default ListSubjects;
