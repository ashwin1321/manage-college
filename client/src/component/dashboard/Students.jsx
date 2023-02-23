import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Students = () => {
  const id = localStorage.getItem("cid");
  const navigate = useNavigate();
  const [isAddStudent, setIsAddStudent] = useState(false);
  const [cid, setCid] = useState(id);
  const [stuid, setStuid] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [isEmptyStudent, setIsEmptyStudent] = useState(false);
  const { idd } = useParams();
  const user = localStorage.getItem("user");
  const rolee = JSON.parse(user).role;
  console.log(idd);

  const isIdValid = idd === id ? true : false;

  const addSubjects = () => {
    setIsAddStudent(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddStudent(false);
    const data = { stuid, name, email, password, cid, role };

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
        alert("student added successfully");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const [students, setStudents] = useState([]);

  useEffect(() => {
    const getStudents = async () => {
      const res = await axios
        .get(`http://localhost:5000/auth/view-students/${cid}/`, {
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
            setIsEmptyStudent(true);
            return;
          }

          const data = res.data;
          setStudents(data);
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    };
    getStudents();
  }, [cid]);

  return (
    <>
      {isIdValid ? (
        <div className="items-center  overflow-auto mt-[3.8%] ">
          {/* Header */}
          <div className="flex flex-row items-center  py-2 justify-between  shadow-md  ">
            <h1 className="text-2xl  px-3 py-1 ml-20 ">
              Students of class: <i>{cid} </i>
            </h1>
            <button
              className="text-lg  px-3 py-[6.5px] mx-[6%]  border text-white bg-blue-500 rounded-[.5rem]  shadow-md pointer flex hover:bg-white hover:text-blue-500 hover:border-blue-500 "
              onClick={addSubjects}
            >
              Add Students
            </button>
          </div>

          {/* add students form */}
          {isAddStudent ? (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                <div className="relative w-[20%] ">
                  {/*content*/}
                  <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none border-0 ">
                    {/*header*/}
                    <div className="flex justify-center p-5  rounded-t border">
                      <h3 className="text-3xl font-semibold">
                        Add a new student
                      </h3>
                    </div>

                    {/*body*/}
                    <div className="relative p-6 flex-auto">
                      <form
                        className=" p-[2%] justify-center flex-col  "
                        onSubmit={handleSubmit}
                      >
                        <div className="flex flex-col items-center my-4 rounded-md">
                          <input
                            placeholder="class ID"
                            type="text"
                            name="cid"
                            value={cid}
                            onChange={(e) => setCid(e.target.value)}
                            className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                            required
                          />
                        </div>
                        <div className="flex flex-col items-center my-4 rounded-md">
                          <select
                            value={role}
                            onChange={(e) => setRole(e.target.value)}
                            className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md  text-lg p-[.7%] flex   "
                            required
                          >
                            <option value="student">Student</option>
                          </select>
                        </div>
                        <div className="flex flex-col items-center my-4 rounded-md">
                          <input
                            placeholder="Student ID"
                            type="text"
                            name="stuid"
                            value={stuid}
                            onChange={(e) => setStuid(e.target.value)}
                            className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                            required
                          />
                        </div>
                        <div className="flex flex-col items-center my-4 rounded-md">
                          <input
                            placeholder="Student Name"
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
                            placeholder="Student Email"
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
                              onClick={() => setIsAddStudent(false)}
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
          ) : null}

          {/* table */}
          {/* create a table to show the mapped students data */}
          {isEmptyStudent ? (
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-3xl font-semibold text-center mt-[3%] text-blue-500 underline">
                Students List
              </h1>

              <div className="flex flex-col ">
                <h1 className="text-2xl font-semibold px-3 py-1 text-center m-5 text-[#E02424]">
                  No Students to show
                </h1>
              </div>
            </div>
          ) : (
            <div className="overflow-auto">
              <h1 className="text-3xl font-semibold text-center mt-[3%] text-blue-500 underline">
                Student List
              </h1>
              <table className="border-collapse w-[80%] ml-[10%] justify-center mt-[2%] ">
                <thead>
                  <tr>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Student ID
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
                <tbody>
                  {console.log(students)}
                  {students.map((students) => (
                    <tr key={students.stuid}>
                      <td className="p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static">
                        {students.stuid}
                      </td>
                      <td className="p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static">
                        {students.name}
                      </td>
                      <td className="p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static">
                        {students.email}
                      </td>
                      <td className="p-3 text-gray-600 justify-center items-center border border-b block lg:table-cell relative lg:static">
                        {rolee === "admin" ? (
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
                        ) : null}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        navigate(-1)
      )}
    </>
  );
};

export default Students;
