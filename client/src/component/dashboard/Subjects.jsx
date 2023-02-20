import React, { useState, useEffect } from "react";
import { useNavigate, Link, useParams } from "react-router-dom";
import axios from "axios";

const Subjects = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isAddSubject, setIsAddSubject] = useState(false);
  const [sid, setSid] = useState("");
  const [subject, setSubject] = useState("");
  const [cid, setCid] = useState(id);
  const [subjects, setSubjects] = useState([]);
  const [isSubjectEmpty, setIsSubjectEmpty] = useState(false);

  const addSubjects = () => {
    setIsAddSubject(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsAddSubject(false);
    const data = { sid, subject, cid };

    const send = await axios
      .post("http://localhost:5000/subject/add-subject", data)
      .then((res) => {
        console.log(res.data);
        alert("subject created successfully");
        navigate(0);
      });
  };

  useEffect(() => {
    axios
      .get(`http://localhost:5000/subject/view-subjects/${id}`)
      // send header with token for validation
      .then((res) => {
        const data = res.data.subjects;

        if (data == undefined) {
          setIsSubjectEmpty(true);
          return;
        }

        console.log(data);
        setSubjects(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="items-center  overflow-auto mt-[3.8%] ">
      {/* Header */}
      <div className="flex flex-row items-center  py-2 justify-between  shadow-md  ">
        <h1 className="text-2xl  px-3 py-1 ml-20 ">
          Subjects for class: <i>{cid} </i>
        </h1>
        <button
          className="text-lg  px-3 py-[6.5px] mx-[6%]  border text-white bg-blue-500 rounded-[.5rem]  shadow-md pointer flex hover:bg-white hover:text-blue-500 hover:border-blue-500 "
          onClick={addSubjects}
        >
          Add Subjects
        </button>
      </div>

      {/* Add Subject */}
      {isAddSubject ? (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-[20%] ">
              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none border-0 ">
                {/*header*/}
                <div className="flex justify-center p-5  rounded-t border">
                  <h3 className="text-3xl font-semibold">Add a new subject</h3>
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
                      <input
                        placeholder="Subject ID"
                        type="text"
                        name="sid"
                        value={sid}
                        onChange={(e) => setSid(e.target.value)}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                        required
                      />
                    </div>

                    <div className="flex flex-col items-center my-4 rounded-md ">
                      <input
                        placeholder="Subject Name"
                        type="text"
                        name="subject"
                        value={subject}
                        onChange={(e) => setSubject(e.target.value)}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex mb-6 "
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b">
                      <div className="flex flex-col items-center ">
                        <button
                          className=" p-[0.5rem] px-[1rem]  border border-red-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-red-500 hover:text-white "
                          onClick={() => setIsAddSubject(false)}
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

      {/* Body */}
      {/* Body */}
      <div className="mt-[2%] justify-center">
        <h1 className="text-[2rem] font-semibold px-3 py-1 text-center m-7 text-[blue] underline">
          Subjects
        </h1>
        <div className="grid grid-cols-3 gap-5 ">
          {isSubjectEmpty ? (
            <>
              <div className="flex flex-col items-center justify-center">
                <h1 className="text-2xl font-semibold px-3 py-1 text-center m-5 text-[#E02424]">
                  No Subjects to show
                </h1>
              </div>
            </>
          ) : null}
          {Object.keys(subjects).map((key) => {
            return (
              <div
                key={key}
                className="flex flex-col items-center border  py-5 shadow-md"
              >
                <Link
                  to={`/class/${subjects[key].cid}/subjects/${subjects[key].sid}`}
                >
                  <div className="flex flex-col items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="blue"
                      className="w-16 h-16"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5"
                      />
                    </svg>
                  </div>
                  <div className="flex flex-col items-center my-1 cursor-pointer">
                    <p className="text-2xl font-bold ">
                      {subjects[key].subject}
                    </p>
                    <p className="font-bold text-lg">{subjects[key].sid}</p>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Subjects;
