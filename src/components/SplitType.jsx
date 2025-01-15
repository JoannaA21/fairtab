import React from "react";
import { Link, useLocation } from "react-router-dom";

const SplitType = () => {
  const location = useLocation();

  // Function to return the correct link based on current pathname
  const splitType = () => {
    if (location.pathname === "/equalsplit") {
      return <Link to="/customsplit">Custom Split</Link>;
    } else if (location.pathname === "/customsplit") {
      return <Link to="/equalsplit">Equal Split</Link>;
    } else {
      return (
        <Link to="/" className="underline hover:text-red-700 text-red-500">
          Page does not exist. Go back to home.
        </Link>
      );
    }
  };

  return (
    <div className="flex mt-8 sm:mt-12 items-center justify-center">
      <button className="w-fit h-fit p-3 m-1 sm:m-3 font-medium sm:text-4xl bg-slate-400 hover:bg-black hover:text-white rounded-lg">
        {splitType()}
      </button>
    </div>
  );
};

export default SplitType;
