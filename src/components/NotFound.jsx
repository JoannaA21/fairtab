import React from "react";
import page404 from "../assets/404_page.png";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <img src={page404} alt="404 image" className="w-full max-w-4xl mb-6" />
      <Link
        to="/"
        className="w-fit h-fit p-3 mt-5 sm:m-3 font-medium sm:text-3xl border-2 hover:bg-black hover:text-white rounded-lg"
      >
        Go back to Home
      </Link>
    </div>
  );
};

export default NotFound;
