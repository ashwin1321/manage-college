import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess } from "../state";
const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [role, setRole] = useState("");
  const [styleList, setStyleList] = useState(
    `mt-2 py-2 px-6 bg-gray-900 bg-opacity-30 text-lg text-gray-400  border-gray-900 rounded-full hover:bg-opacity-50 hover:text-gray-100 cursor-pointer  `
  );
  const [activeStyle, setActiveStyle] = useState(
    `mt-2 py-2 px-6 bg-gray-900 bg-opacity-50 text-lg text-gray-100  border-gray-900 rounded-full  cursor-pointer  `
  );

  const classid = localStorage.getItem("user");
  const cid = JSON.parse(classid).cid;
  const tid = JSON.parse(classid).tid;

  const logout = () => {
    console.log("logout");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    localStorage.removeItem("cid");
    localStorage.removeItem("tid");
    localStorage.removeItem("sid");

    dispatch(loginSuccess(""));
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
    <div className=" bg-gray-800 h-screen w-[15.57rem] fixed  left-0 overflow-y-auto mt-[3.8rem]  ">
      <div className="flex flex-col  items-center justify-center mt-4 mb-6 text-white text-lg">
        <span className="font-bold text-2xl ">
          My<span style={{ color: "#0a6ea9" }}>College</span>
        </span>
      </div>

      {/*  set state which clicked */}
      {role === "student" ? (
        <div>
          <ul>
            <Link to={`/class/subjects/${cid}`}>
              <li className={styleList}>
                <span className="">Subjects</span>
              </li>
            </Link>

            <Link to={`/class/subjects/${cid}`}>
              <li className={styleList}>
                <span className="">Assignments</span>
              </li>
            </Link>

            <Link to={`/class/subjects/${cid}`}>
              <li className={styleList}>
                <span className="">Notes</span>
                {/* student view notes */}
              </li>
            </Link>

            <Link to={`/notice`}>
              <li className={styleList}>
                <span className="">Notice</span>
              </li>
            </Link>

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
            <Link to={`/teachers/subjects/${tid}`}>
              <li className={styleList}>
                <span className="">Subjects</span>
              </li>
            </Link>

            <Link to={`/notice`}>
              <li className={styleList}>
                <span className="">Notice</span>
              </li>
            </Link>

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
            <Link to={`/classView`}>
              <li className={styleList}>
                <span className="">Class</span>
                {/* add and view students in particular class*/}
              </li>
            </Link>

            <Link to={`/teachers`}>
              <li className={styleList}>
                <span className="">Teachers</span>
              </li>
            </Link>

            <Link to={`/notice`}>
              <li className={styleList}>
                <span className="">Notice</span>
              </li>
            </Link>

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
