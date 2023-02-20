import React from "react";
// import { useNavigate } from "react-router-dom";
import { useNavigate, Link, useParams } from "react-router-dom";

const Subjects = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  console.log(id);
  return (
    <div className="items-center  overflow-auto mt-[3.8%]  ">
      {/* Header */}
      <div className="flex flex-row items-center  py-1 mt-3  justify-center shadow-sm  ">
        <h1 className="text-2xl font-semibold px-3 py-1  ">
          View Subjects and Students
        </h1>
      </div>
      <div className="grid grid-cols-2 gap-5 mt-10 ">
        <div className="flex flex-col items-center border  py-5 m-3 shadow-md">
          <Link to={`/class/subjects/${id}`}>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="blue"
                className="w-19 h-12"
              >
                <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
              </svg>

              <h1 className="text-2xl font-semibold px-3 py-1  ">
                View Subjects
              </h1>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center border  py-5 m-3 shadow-md">
          <Link to={`/class/students/${id}`}>
            <div className="flex flex-col items-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="blue"
                className="w-19 h-12"
              >
                <path d="M10 8a3 3 0 100-6 3 3 0 000 6zM3.465 14.493a1.23 1.23 0 00.41 1.412A9.957 9.957 0 0010 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 00-13.074.003z" />
              </svg>
              <h1 className="text-2xl font-semibold px-3 py-1  ">
                View Students
              </h1>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Subjects;
