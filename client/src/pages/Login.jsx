import React, { useState } from "react";
import Navbar from "../component/Navbar";
import homeImg from "./home.jpg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../state";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("teacher");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();

  const data = { email, password, role };
  console.log(data);

  const handleSubmit = async (e) => {
    e.preventDefault();

    axios.post("http://localhost:5000/auth/login", data).then((res) => {
      if (res.data.noUser) {
        setEmailError("user doesnot exists");
        return;
      }

      if (res.data.wrongPassword) {
        setPasswordError("wrong password");
        console.log(error);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
      localStorage.setItem("cid", res.data.user.cid);
      navigate("/dashboard");
      dispatch(loginSuccess(res.data.user));
      localStorage.setItem("token", res.data.token);
    });
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
                  <option value="admin">Admin</option>
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
                  required
                />
                <p style={{ color: "red" }}>{emailError} </p>
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
                <p style={{ color: "red" }}>{passwordError} </p>
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
