import React from "react";
import { Link, useLocation } from "react-router-dom";
import EqualSplit from "./EqualSplit";

const SplitType = () => {
  const location = useLocation();

  // Function to return the correct link based on current pathname
  const splitType = () => {
    if (location.pathname === "/equalsplit") {
      return <Link to="/customsplit">Custom Split</Link>;
    }
    if (location.pathname === "/customsplit") {
      return <Link to="/equalsplit">Equal Split</Link>;
    }
  };

  // Function to set the header text
  const setHeader = () => {
    if (location.pathname === "/equalsplit") {
      return (
        <p className="mt-4 sm:mt-14 text-4xl sm:text-7xl font-semibold text-white cursor-default">
          Equal Split
        </p>
      );
    }
    if (location.pathname === "/customsplit") {
      return (
        <p className="mt-4 sm:mt-14 text-4xl sm:text-7xl font-semibold text-white cursor-default">
          Custom Split
        </p>
      );
    }
  };

  return (
    <div className="flex flex-col h-fit w-full items-center justify-center mx-auto">
      {setHeader()}
      <button className="w-fit h-fit p-1 sm:p-3 mt-5 sm:mt-10 font-medium sm:text-3xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg">
        {splitType()}
      </button>
    </div>
  );
};

export default SplitType;
