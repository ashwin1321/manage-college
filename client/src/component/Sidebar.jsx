import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState("");
  const [styleList, setStyleList] = useState(
    `mt-2 py-2 px-6 bg-gray-900 bg-opacity-30 text-lg text-gray-400  border-gray-900 rounded-full hover:bg-opacity-50 hover:text-gray-100 cursor-pointer  `
  );

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  useEffect(() => {
    const user = () => {
      if (localStorage.getItem("user")) {
        const user = localStorage.getItem("user");
        const role = JSON.parse(user).role;
        setRole(role);
      }
    };
    user();
  });

  return (
    <div className=" bg-gray-800 h-screen w-[15.57rem] fixed  left-0 overflow-y-auto mt-[3.18%]">
      <div className="flex flex-col  items-center justify-center mt-4 mb-6 text-white text-lg">
        <span className="font-bold text-2xl ">
          My<span style={{ color: "#0a6ea9" }}>College</span>
        </span>
      </div>

      {/*  set state which clicked */}
      {role === "student" ? (
        <div>
          <ul>
            <li className={styleList}>
              <span className="">Subjects</span>
            </li>
            <li className={styleList}>
              <span className="">Assignments</span>
            </li>
            <li className={styleList}>
              <span className="">Notes</span>
              {/* student view notes */}
            </li>
            <li className={styleList}>
              <span className="">Notice</span>
            </li>

            <li className={styleList} onClick={logout}>
              <span className="">Logout</span>
            </li>
          </ul>
        </div>
      ) : (
        <div> </div>
      )}

      {role === "teacher" ? (
        <div>
          <ul>
            <li className={styleList}>
              <span className="">Students</span>
            </li>
            <li className={styleList}>
              <span className="">Assignments</span>
            </li>
            <li className={styleList}>
              <span className="">Notes</span>
              {/* teacher upload note and view */}
            </li>
            <li className={styleList}>
              <span className="">Notice</span>
              {/* view notice */}
            </li>

            <li className={styleList} onClick={logout}>
              <span className="">Logout</span>
            </li>
          </ul>
        </div>
      ) : (
        <div> </div>
      )}

      {role === "admin" ? (
        <div>
          <ul>
            <li className={styleList}>
              <span className="">Class</span>
              {/* add and view students in particular class*/}
            </li>
            <li className={styleList}>
              <span className="">Teachers</span>
            </li>
            <li className={styleList}>
              <span className="">Add Class </span>
              {/* teacher upload note and view */}
            </li>
            <li className={styleList}>
              <span className="">Notice</span>
              {/* add notice */}
            </li>

            <li className={styleList} onClick={logout}>
              <span className="">Logout</span>
            </li>
          </ul>
        </div>
      ) : (
        <div> </div>
      )}
    </div>
  );
};

export default Sidebar;
