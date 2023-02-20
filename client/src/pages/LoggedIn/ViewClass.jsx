import React from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import ClassView from "../../component/dashboard/ClassView";

const ViewClass = () => {
  return (
    <div>
      <Navbar position="fixed w-full" />
      <div className="grid grid-cols-6 ">
        <div className=" col-span-1">
          <Sidebar />
        </div>
        <div className="col-span-5">
          {/* <Classes />
           */}
          <ClassView />
        </div>
      </div>
    </div>
  );
};

export default ViewClass;
