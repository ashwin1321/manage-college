import React, { useEffect } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Notices from "../../component/dashboard/Notices";

const ListSubjects = () => {
  return (
    <div>
      <Navbar position="w-full fixed   " />

      <div className="flex flex-row ">
        <div className="w-72 h-screen overflow-auto">
          <Sidebar />
        </div>
        <div className=" mt-[3.2%] w-full  ">
          <Notices />
        </div>
      </div>
    </div>
  );
};

export default ListSubjects;
