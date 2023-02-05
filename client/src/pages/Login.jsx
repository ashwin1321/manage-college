import React, { useState } from "react";
import Navbar from "../component/Navbar";
import homeImg from "./home.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    if (email === "" || password === "") {
      alert("Please fill all the fields");
      return;
    }

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

          <div className="text-center flex flex-col items-center  border border-blue-500  mt-[11%] px-[6%] py-6 shadow-md  ">
            <h3 className="text-[30px] font-bold text-blue-500 ">Login </h3>

            <form className="my-3 p-[5%]">
              <div className="flex flex-col items-center my-3">
                <input
                  placeholder="example@gmail.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="border border-gray-500 rounded-[.3rem] w-full text-center shadow-md pointer text-lg flex  "
                  required
                />
              </div>

              <div className="flex flex-col items-center ">
                <input
                  placeholder="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border border-gray-500 rounded-[.3rem] my-4 shadow-md  text-center text-lg flex  "
                  required
                />
              </div>

              <div className="flex flex-col items-center ">
                <button
                  className="mt-[01rem] p-[0.5rem] px-[1rem]  border border-blue-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-blue-500 hover:text-white "
                  type="submit"
                  onClick={handleSubmit}
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
