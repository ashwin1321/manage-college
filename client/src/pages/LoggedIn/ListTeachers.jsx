import React, { useEffect } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Teachers from "../../component/dashboard/Teachers";

const ListTeachers = () => {
  return (
    <div>
      <Navbar position="w-full fixed  " />

      <div className="flex flex-row ">
        <div className="w-72 h-screen overflow-auto">
          <Sidebar />
        </div>
        <div className=" w-full overflow-auto ">
          <Teachers />
        </div>
      </div>
    </div>
  );
};

export default ListTeachers;
