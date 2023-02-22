import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TeacherSubject = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");
  const tid = JSON.parse(user).tid;
  const { tidd } = useParams();

  const isIdvalid = tidd === tid ? true : false;

  console.log(isIdvalid);
  // const { tid } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [isSubjectEmpty, setIsSubjectEmpty] = useState(false);

  useEffect(() => {
    const getSubjects = async () => {
      const res = await axios
        .get(`http://localhost:5000/subject/get-subjects/${tid}`)
        .then((res) => {
          if (res.data.subjects.length === 0) {
            setIsSubjectEmpty(true);
          }
          setSubjects(res.data.subjects);
        });
    };
    getSubjects();
  }, [tid]);

  return (
    <>
      {isIdvalid ? (
        <div className="   w-full h-screen   overflow-y-auto ">
          <div className="flex flex-row items-center  py-2 justify-between  shadow-md mt-16 ">
            <h1 className="text-2xl  px-3 py-1 ml-20 ">Subjects</h1>
          </div>

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
                      to={`/class/${subjects[key].cid}/subjects/view`}
                      onClick={() =>
                        localStorage.setItem("sid", subjects[key].sid)
                      }
                    >
                      <div className="flex flex-col items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="blue"
                          className="w-19 h-12"
                        >
                          <path d="M10.75 16.82A7.462 7.462 0 0115 15.5c.71 0 1.396.098 2.046.282A.75.75 0 0018 15.06v-11a.75.75 0 00-.546-.721A9.006 9.006 0 0015 3a8.963 8.963 0 00-4.25 1.065V16.82zM9.25 4.065A8.963 8.963 0 005 3c-.85 0-1.673.118-2.454.339A.75.75 0 002 4.06v11a.75.75 0 00.954.721A7.506 7.506 0 015 15.5c1.579 0 3.042.487 4.25 1.32V4.065z" />
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
      ) : (
        navigate(1)
      )}
    </>
  );
};

export default TeacherSubject;
