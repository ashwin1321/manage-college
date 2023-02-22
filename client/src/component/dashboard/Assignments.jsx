import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const Assignments = () => {
  const sid = localStorage.getItem("sid");
  const { idd } = useParams();

  const user = localStorage.getItem("user");
  const role = JSON.parse(user).role;
  const [isAddAssignment, setIsAddAssignment] = useState(false);
  const [assignment, setAssignment] = useState("");
  const [note, setNotes] = useState("");
  const [assignments, setAssignments] = useState([]);
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [isEmptyAssignment, setIsEmptyAssignment] = useState(false);
  const navigate = useNavigate();

  const isIdvalid = idd === sid ? true : false;

  const onadd = () => {
    setIsAddAssignment(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsAddAssignment(false);
    const data = { assignment, note, sid };

    axios
      .post("http://localhost:5000/assignments/add-assignment/:sid", data)
      .then((res) => {
        alert("Assignment added successfully");
        console.log(res.data);
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteAssignment = (id) => {
    axios
      .delete(`http://localhost:5000/assignments/delete-assignment/${id}`)
      .then((res) => {
        alert("Assignment deleted successfully");
        console.log(res.data);
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/assignments/view-assignments/${sid}`)
      .then((res) => {
        if (res.data.length === 0) {
          setIsEmptyAssignment(true);
          return;
        }

        setAssignments(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [sid]);

  return (
    <>
      {isIdvalid ? (
        <div className="items-center  overflow-auto mt-[3.8%] ">
          {/* Header */}
          <div className="flex flex-row items-center  py-2 justify-between  shadow-md  ">
            <h1 className="text-2xl  px-3 py-1 ml-20 ">
              Assignment for subject: <i>{sid} </i>
            </h1>

            {role === "teacher" && (
              <button
                className="text-lg  px-3 py-[6.5px] mx-[6%]  border text-white bg-blue-500 rounded-[.5rem]  shadow-md pointer flex hover:bg-white hover:text-blue-500 hover:border-blue-500 "
                onClick={onadd}
              >
                Add Assignments
              </button>
            )}
          </div>

          {isAddAssignment && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
                <div className="relative w-[20%] ">
                  {/*content*/}
                  <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none border-0 ">
                    {/*header*/}
                    <div className="flex justify-center p-5  rounded-t border">
                      <h3 className="text-3xl font-semibold">
                        Add a new Assignment
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
                            placeholder="Subject ID"
                            type="text"
                            name="cid"
                            value={sid}
                            onChange={(e) => setSid(e.target.value)}
                            className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                            required
                          />
                        </div>
                        {/* <div className="flex flex-col items-center my-4 rounded-md">
                      <input
                        placeholder="assignment"
                        type="file"
                        name="assignment"
                        value={assignment}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                        required
                      />
                    </div> */}
                        <div className="flex flex-col items-center my-4 rounded-md">
                          <textarea
                            placeholder="place assignments here"
                            type="file"
                            name="name"
                            value={assignment}
                            onChange={(e) => setAssignment(e.target.value)}
                            className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                            required
                          />
                        </div>
                        <div className="flex flex-col items-center my-4 rounded-md">
                          <textarea
                            placeholder="notes, if any for the assignment"
                            type="file"
                            name="name"
                            value={note}
                            onChange={(e) => setNotes(e.target.value)}
                            className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                            required
                          />
                        </div>

                        <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b">
                          <div className="flex flex-col items-center ">
                            <button
                              className=" p-[0.5rem] px-[1rem]  border border-red-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-red-500 hover:text-white "
                              onClick={() => setIsAddAssignment(false)}
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

          {isEmptyAssignment ? (
            <div className="flex flex-col items-center justify-center h-[80vh]">
              <h1 className="text-2xl font-semibold">No Assignments</h1>
            </div>
          ) : (
            <div className="overflow-auto">
              <h1 className="text-3xl font-semibold text-center mt-[3%] text-blue-500 underline">
                Assignment Lists
              </h1>
              <table className="border-collapse w-[80%] ml-[10%] justify-center mt-[2%] ">
                <thead>
                  <tr>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Id
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Assignment
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Notes
                    </th>
                    <th className="p-3 font-bold uppercase bg-gray-200 text-gray-600 border border-gray-300 hidden lg:table-cell">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {/* {console.log(students)} */}
                  {assignments.map((a) => (
                    <tr key={a.id}>
                      <td className="p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static">
                        {a.id}
                      </td>
                      <td className="p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static">
                        {a.assignment}
                      </td>
                      <td className="p-3 text-gray-600 text-center border border-b block lg:table-cell relative lg:static">
                        {a.note}
                      </td>

                      <td className="p-3 text-gray-600 justify-center items-center border border-b block lg:table-cell relative lg:static">
                        <div className="flex flex-row justify-center gap-5 items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            className="w-4 h-5 text-blue-700 hover:text-blue-400 cursor-pointer mt-[0.5px]"
                          >
                            <path d="M10 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
                            <path
                              fillRule="evenodd"
                              d="M.664 10.59a1.651 1.651 0 010-1.186A10.004 10.004 0 0110 3c4.257 0 7.893 2.66 9.336 6.41.147.381.146.804 0 1.186A10.004 10.004 0 0110 17c-4.257 0-7.893-2.66-9.336-6.41zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>

                          {role === "teacher" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="w-4 h-5  text-red-700 hover:text-red-400 cursor-pointer"
                              onClick={() => deleteAssignment(a.id)}
                            >
                              <path
                                fillRule="evenodd"
                                d="M8.75 1A2.75 2.75 0 006 3.75v.443c-.795.077-1.584.176-2.365.298a.75.75 0 10.23 1.482l.149-.022.841 10.518A2.75 2.75 0 007.596 19h4.807a2.75 2.75 0 002.742-2.53l.841-10.52.149.023a.75.75 0 00.23-1.482A41.03 41.03 0 0014 4.193V3.75A2.75 2.75 0 0011.25 1h-2.5zM10 4c.84 0 1.673.025 2.5.075V3.75c0-.69-.56-1.25-1.25-1.25h-2.5c-.69 0-1.25.56-1.25 1.25v.325C8.327 4.025 9.16 4 10 4zM8.58 7.72a.75.75 0 00-1.5.06l.3 7.5a.75.75 0 101.5-.06l-.3-7.5zm4.34.06a.75.75 0 10-1.5-.06l-.3 7.5a.75.75 0 101.5.06l.3-7.5z"
                                clipRule="evenodd"
                              />
                            </svg>
                          ) : null}
                        </div>
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

export default Assignments;
