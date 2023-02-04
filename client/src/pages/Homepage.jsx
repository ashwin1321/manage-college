import React from "react";
import Navbar from "../component/Navbar";
import homeImg from "./home.jpg";

const Homepage = () => {
  return (
    <div>
      <Navbar />
      <section>
        <div className="flex flex-row grow items-center m-[7%] justify-center  max-[991px]:flex-col  ">
          <div className="mt-24">
            <img src={homeImg} alt="image" />
          </div>

          <div className="text-center flex flex-col items-center leading-10">
            <h3 className="text-[30px] font-bold  ">
              Welcome to My College, your study bud.
            </h3>

            <p className="text=xl font-gray-500 text-[20px]">
              Learn, Grow, and Excel with us.
            </p>

            <button className="mt-[01rem] p-[0.5rem] px-[1rem]  border border-sky-500 rounded-[.5rem]  shadow-md pointer text-lg flex hover:bg-sky-500 hover:text-white ">
              Login
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Homepage;
