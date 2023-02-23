import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Notices = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const role = JSON.parse(user).role;
  const [isOnAdd, setIsOnAdd] = useState(false);
  const [note, setNote] = useState("");
  const [notices, setNotices] = useState([]);
  const [isNoteEmpty, setIsNoteEmpty] = useState(false);
  const date = new Date().toLocaleDateString();

  const onadd = () => {
    setIsOnAdd(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsOnAdd(false);
    const data = { notice: note, date };
    console.log(data);

    axios
      .post("http://localhost:5000/notice/add-notice", data, {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        alert("Notice added successfully");
        navigate(0);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("http://localhost:5000/notice/view-notice", {
        headers: {
          token: localStorage.getItem("token"),
        },
      })
      .then((res) => {
        if (res.data.length === 0) {
          setIsNoteEmpty(true);
          return;
        }
        const data = res.data;
        console.log(data);
        setNotices(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="  overflow-y-auto  ">
      {/* Header */}
      <div className="flex flex-row items-center  py-2 justify-between  shadow-md  ">
        <h1 className="text-2xl  px-3 py-1 ml-20 text-blue-600  ">Notices</h1>
        {role === "admin" && (
          <button
            className="text-lg  px-3 py-[6.5px] mx-[6%]   border text-white bg-blue-500 rounded-[.5rem]  shadow-md pointer flex hover:bg-white hover:text-blue-500 hover:border-blue-500 "
            onClick={onadd}
          >
            Add Notice
          </button>
        )}
      </div>

      {isOnAdd && (
        <>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50">
            <div className="relative w-[20%] ">
              {/*content*/}
              <div className=" rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none border-0 ">
                {/*header*/}
                <div className="flex justify-center p-5  rounded-t border">
                  <h3 className="text-3xl font-semibold">Add Notice</h3>
                </div>

                {/*body*/}
                <div className="relative p-6 flex-auto">
                  <form
                    className=" p-[2%] justify-center flex-col  "
                    onSubmit={handleSubmit}
                  >
                    <div className="flex flex-col items-center my-4 rounded-md">
                      <textarea
                        placeholder="date"
                        type="text"
                        name="date"
                        value={date}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                        required
                      />
                    </div>
                    <div className="flex flex-col items-center my-4 rounded-md">
                      <textarea
                        placeholder="Add notices"
                        type="text"
                        name="notice"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                        className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                        required
                      />
                    </div>

                    <div className="flex items-center justify-end  border-t border-solid border-slate-200 rounded-b">
                      <div className="flex flex-col items-center ">
                        <button
                          className=" p-[0.5rem] px-[1rem]  border border-red-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-red-500 hover:text-white "
                          onClick={() => setIsOnAdd(false)}
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

      {isNoteEmpty ? (
        <div className="flex flex-col items-center justify-center ">
          <h1 className="text-2xl text-gray-900">No notices to show</h1>
        </div>
      ) : (
        <div className="flex flex-col ml-20 mt-10 ">
          {notices.map((notice) => (
            <div
              className="flex flex-row items-center left-10 gap-2 my-2"
              key={notice.id}
            >
              <p className="text-xl ">{notice.id}.</p>
              <p className="text-xl text-blue-500">{notice.data}: </p>
              <h1 className="text-2xl text-gray-900">{notice.notice}</h1>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Notices;
