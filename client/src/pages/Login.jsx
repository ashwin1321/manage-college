import React, { useState } from "react";
import Navbar from "../component/Navbar";
import homeImg from "./home.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(role);

    navigate("/");

    const user = { email, password };
  };

  return (
    <div>
      <Navbar />

      <section>
        <div className="flex flex-row  items-center m-[7%] justify-center  max-[991px]:flex-col ">
          <div className="mt-[7%]">
            <img src={homeImg} alt="image" />
          </div>

          <div className="text-center flex flex-col items-center  border border-blue-500  mt-[11%] px-[6%] py-5 shadow-md  ">
            <h3 className="text-[30px] font-bold text-blue-500 ">Login </h3>

            <form className="my-3 p-[5%]" onSubmit={handleSubmit}>
              <div className="flex flex-col items-center my-3">
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md  text-lg p-[.7%] flex   "
                  required
                >
                  <option value="teacher">Teacher</option>
                  <option value="student">Student</option>
                </select>
              </div>

              <div className="flex flex-col items-center my-3">
                <input
                  placeholder="example@gmail.com"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                  // required
                />
              </div>

              <div className="flex flex-col items-center ">
                <input
                  placeholder="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-500 rounded-[.3rem] my-2 shadow-md  text-center text-lg flex  "
                  required
                />
              </div>

              <div className="flex flex-col items-center ">
                <button
                  className="mt-[01rem] p-[0.5rem] px-[1rem]  border border-blue-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-blue-500 hover:text-white "
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Login;
