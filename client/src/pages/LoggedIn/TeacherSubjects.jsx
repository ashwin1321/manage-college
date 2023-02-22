import React, { useEffect } from "react";
import Navbar from "../../component/Navbar";
import Sidebar from "../../component/Sidebar";
import TeacherSubject from "../../component/dashboard/TeacherSubject";

const TeacherSubjects = () => {
  return (
    <div>
      <Navbar position="w-full fixed  " />

      <div className="flex flex-row ">
        <div className="w-72 h-screen overflow-auto">
          <Sidebar />
        </div>
        <div className=" w-full overflow-auto ">
          <TeacherSubject />
        </div>
      </div>
    </div>
  );
};

export default TeacherSubjects;
