import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Teachers = () => {
  const user = localStorage.getItem("user");
  const rolee = JSON.parse(user).role;
  const navigate = useNavigate();
  const [isAdd, setIsAdd] = useState(false);
  const [role, setRole] = useState("teacher");
  const [tid, setTid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [teachers, setTeachers] = useState([]);
  const [isEmptyTeacher, setIsEmptyTeacher] = useState(false);
  const [isAssign, setIsAssign] = useState(false);
  const [teacherId, setTeacherId] = useState("");
  const [subjectId, setSubjectId] = useState("");

  const onadd = () => {
    setIsAdd(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAdd(false);
    const data = { role, tid, name, email, password };

    const send = await axios
      .post("http://localhost:5000/auth/register", data, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          alert("Something went wrong");
          return;
        }
        alert("Teacher added successfully");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleAssign = async (e) => {
    e.preventDefault();
    setIsAssign(false);
    const data = { tid: teacherId, sid: subjectId };

    const send = await axios
      .post("http://localhost:5000/subject/assign-teacher", data, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.error) {
          alert("Something went wrong");
          return;
        }
        alert("Subject assigned successfully");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // paginate
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(teachers.length / itemsPerPage);

  const handlePageClick = (pageNumber) => {
    if (pageNumber < 1) pageNumber = 1;
    if (pageNumber > totalPages) pageNumber = totalPages;

    setCurrentPage(pageNumber);
  };

  const renderTableData = () => {
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const slicedData = teachers.slice(start, end);

    return slicedData.map((teacher, index) => {
      return (
        <tr key={index + 1}>
          <td className="p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static">
            {teacher.tid}
          </td>
          <td className="p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static">
            {teacher.name}
          </td>
          <td className="p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static">
            {teacher.email}
          </td>
          <td className="p-3 text-gray-600 justify-center items-center border border-b block lg:table-cell relative lg:static">
            {rolee === "admin" ? (
              <div className="flex fkex-row justify-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5  text-red-700 hover:text-red-400 cursor-pointer"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                    clipRule="evenodd"
                  />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="w-5 h-5 text-green-700 hover:text-green-400 cursor-pointer"
                  onClick={() => {
                    setIsAssign(true);
                    setTeacherId(teacher.tid);
                  }}
                >
                  <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                </svg>
              </div>
            ) : null}
          </td>
        </tr>
      );
    });
  };
  const renderPageNumbers = () => {
    const pageNumbers = [];

    for (let i = 1; i <= totalPages; i++) {
      pageNumbers.push(
        <li
          key={i}
          onClick={() => handlePageClick(i)}
          className={`inline-block mx-1 cursor-pointer rounded ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-white text-blue-500 hover:bg-gray-200"
          }`}
        >
          {i}
        </li>
      );
    }
    return (
      <div className="flex justify-center mt-4 gap-2">
        <button
          className={`bg-white hover:bg-blue-600 text-blue-500 hover:text-white font-semibold px-2  border border-gray-400 rounded shadow ${
            currentPage === 1 && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => handlePageClick(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <button
          className={`bg-white hover:bg-blue-600 text-blue-500 hover:text-white font-semibold  px-2 border border-gray-400 rounded shadow ${
            currentPage === totalPages && "opacity-50 cursor-not-allowed"
          }`}
          onClick={() => handlePageClick(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    );
  };

  useEffect(() => {
    const getTeachers = async () => {
      const res = await axios
        .get("http://localhost:5000/auth/view-teachers", {
          headers: {
            token: localStorage.getItem("token"),
          },
        })
        .then((res) => {
          if (res.data.error) {
            alert("Something went wrong");
            return;
          }

          if (res.data.length === 0) {
            setIsEmptyTeacher(true);
          }
          setTeachers(res.data);
        });
    };
    getTeachers();
  }, []);

  return (
    <div className="   w-full h-screen   overflow-y-auto ">
      {/* Header */}
      <div className="flex flex-row items-center  py-2 justify-between  shadow-md mt-16 ">
        <h1 className="text-2xl  px-3 py-1 ml-20 ">Teachers</h1>

        {rolee === "admin" && (
          <button
            className="text-lg  px-3 py-[6.5px] mx-[6%]  border text-white bg-blue-500 rounded-[.5rem]  shadow-md pointer flex hover:bg-white hover:text-blue-500 hover:border-blue-500 "
            onClick={onadd}
          >
            Add Teacher
          </button>
        )}
      </div>

      {isAdd && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-[20%] ">
              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none border-0 ">
                {/*header*/}
                <div className="flex justify-center p-5  rounded-t border">
                  <h3 className="text-3xl font-semibold">Add Teacher</h3>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    className=" p-[2%] justify-center flex-col  "
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col items-center my-4 rounded-md">
                      <select
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md  text-lg p-[.7%] flex   "
                        required
                      >
                        <option value="teacher">Teacher</option>
                      </select>
                    </div>
                    <div className="flex flex-col items-center my-4 rounded-md">
                      <input
                        placeholder="Teacher ID"
                        type="text"
                        name="tid"
                        value={tid}
                        onChange={(e) => setTid(e.target.value)}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                        required
                      />
                    </div>
                    <div className="flex flex-col items-center my-4 rounded-md">
                      <input
                        placeholder="Teacher Name"
                        type="text"
                        name="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                        required
                      />
                    </div>

                    <div className="flex flex-col items-center my-4 rounded-md">
                      <input
                        placeholder="Teacher Email"
                        type="email"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                        required
                      />
                    </div>
                    <div className="flex flex-col items-center my-4 rounded-md ">
                      <input
                        placeholder="password"
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex mb-6 "
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b">
                      <div className="flex flex-col items-center ">
                        <button
                          className=" p-[0.5rem] px-[1rem]  border border-red-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-red-500 hover:text-white "
                          onClick={() => setIsAdd(false)}
                        >
                          Close
                        </button>
                      </div>
                      <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                        <div className="flex flex-col items-center ">
                          <button
                            className=" p-[0.5rem] px-[1rem]  border border-blue-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-blue-500 hover:text-white "
                            type="submit"
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}

      {isEmptyTeacher ? (
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl font-semibold text-center mt-[3%] text-blue-500 underline">
            Teacher List
          </h1>

          <div className="flex flex-col ">
            <h1 className="text-2xl font-semibold px-3 py-1 text-center m-5 text-[#E02424]">
              No Teacher to show
            </h1>
          </div>
        </div>
      ) : (
        <div className="overflow-auto">
          <h1 className="text-3xl font-semibold text-center mt-[3%] text-blue-500 underline">
            Teacher List
          </h1>
          <p className="text-[12px] text-center ml-[70%] underline text-green-800">
            Click on + to assign subject to the teacher
          </p>
          <table className="border-collapse w-[80%] ml-[10%] justify-center mt-[1%] ">
            <thead>
              <tr>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Teacher ID
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Name
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Email
                </th>
                <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>{renderTableData()}</tbody>
          </table>
          {renderPageNumbers()}
        </div>
      )}

      {isAssign && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-[20%] ">
              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none border-0 ">
                {/*header*/}
                <div className="flex justify-center p-5  rounded-t border">
                  <h3 className="text-3xl font-semibold">Assign Subject</h3>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    className=" p-[2%] justify-center flex-col  "
                    onSubmit={handleAssign}
                  >
                    <div className="flex flex-col items-center my-4 rounded-md">
                      <input
                        placeholder="Teacher ID"
                        type="text"
                        name="tid"
                        value={teacherId}
                        onChange={(e) => setTeacherId(e.target.value)}
                        disabled
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                        required
                      />
                    </div>
                    <div className="flex flex-col items-center my-4 rounded-md">
                      <input
                        placeholder="Subject ID"
                        type="text"
                        name="subjectId"
                        value={subjectId}
                        onChange={(e) => setSubjectId(e.target.value)}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b">
                      <div className="flex flex-col items-center ">
                        <button
                          className=" p-[0.5rem] px-[1rem]  border border-red-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-red-500 hover:text-white "
                          onClick={() => setIsAssign(false)}
                        >
                          Close
                        </button>
                      </div>
                      <div className="flex items-center justify-end p-3 border-t border-solid border-slate-200 rounded-b">
                        <div className="flex flex-col items-center ">
                          <button
                            className=" p-[0.5rem] px-[1rem]  border border-blue-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-blue-500 hover:text-white "
                            type="submit"
                          >
                            Assign
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      )}
    </div>
  );
};

export default Teachers;
