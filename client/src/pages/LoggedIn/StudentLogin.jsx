import React, { useEffect } from "react";
import Navbar from "../../component/Navbar";
import axios from "axios";
import Sidebar from "../../component/Sidebar";
import Classes from "../../component/dashboard/Classes";

const StudentLogin = () => {
  return (
    <div>
      <Navbar />
      <div className="grid grid-cols-6 ">
        <div className=" col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5">
          <Classes />
        </div>
      </div>
    </div>
  );
};

export default StudentLogin;
