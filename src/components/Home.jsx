import { useState } from "react";
import logo from "../assets/shareholder.png";
import { Link } from "react-router-dom";
const Home = () => {
  return (
    <div className="flex min-h-screen max-w-screen-xl mx-auto bg-zinc-950">
      <div className="m-14 w-full bg-zinc-800 rounded-2xl">
        <div className="flex flex-col mt-36 sm:mt-20 items-center justify-center">
          <img src={logo} alt="logo" className="h-32 sm:h-52" />
          <h1 className="mt-4 sm:mt-10 text-4xl sm:text-5xl font-semibold text-white font-serif cursor-default">
            Fair Tab
          </h1>
        </div>

        <div className="flex mt-8 sm:mt-12 items-center justify-center">
          <Link
            to="/equalsplit"
            className="w-fit h-fit p-3 m-1 sm:m-3 font-medium sm:text-4xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg"
          >
            Equal Split
          </Link>
          <Link
            to="/customsplit"
            className="w-fit h-fit p-3 m-1 sm:m-3 font-medium sm:text-4xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg"
          >
            Custom Split
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
