import React, { useEffect } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import Notes from "../../component/dashboard/Notes";

const ListSubjects = () => {
  return (
    <div>
      <Navbar position="w-full fixed  " />

      <div className="flex flex-row ">
        <div className="w-72 h-screen overflow-auto">
          <Sidebar />
        </div>
        <div className=" w-full overflow-auto ">
          <Notes />
        </div>
      </div>
    </div>
  );
};

export default ListSubjects;
