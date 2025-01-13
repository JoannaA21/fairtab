import { useState } from "react";
import logo from "../assets/shareholder.png";
import { Link } from "react-router-dom";
const Home = () => {
  const [splitMode, setSplitMode] = useState("equal"); //default split value is equal
  const [bill, setBill] = useState(0); //Total bill
  const [tipPercentage, setTipPercentage] = useState(0); //Tip default amount is 0
  const [peopleCount, setPeopleCount] = useState(1); //Number of people
  const [customAmounts, setCustomAmounts] = useState({ name: "", amount: 0 });

  //function to toggle between equal split and custom split
  const toggleSplitMode = () => {
    setSplitMode((prevMode) => (prevMode === "equal" ? "custom" : "equal"));
  };

  return (
    <div className="flex w-full h-screen bg-black">
      <div className="m-14 w-full bg-slate-800 rounded-2xl">
        <div className="flex flex-col pt-36 items-center justify-center">
          <img src={logo} alt="logo" className="h-32" />
          <h1 className="mt-4 text-4xl font-semibold text-white">Fair Tab</h1>
        </div>

        <div className="flex mt-14 items-center justify-center">
          <Link
            to="/equalsplit"
            className="w-fit h-fit p-3 m-1 font-medium bg-slate-400 hover:bg-black hover:text-white rounded-lg"
          >
            Equal Split
          </Link>
          <Link
            to="/customsplit"
            className="w-fit h-fit p-3 m-1 font-medium bg-slate-400 hover:bg-black hover:text-white rounded-lg"
          >
            Custom Split
          </Link>
        </div>
      </div>
    </div>
    // <div className="flex w-full h-screen bg-black">
    //   <div className="m-4 w-96 h-110 rounded-2xl bg-neutral-900">
    //     {/* toggle button */}
    //     <button
    //       onClick={toggleSplitMode}
    //       className="p-2 mt-3 mx-auto block rounded-lg bg-gray-500 hover:bg-neutral-50"
    //     >
    //       {splitMode === "equal" ? "Even Split" : "Custom Split"}
    //     </button>

    //     {/* Result for Equal Split here */}
    //     {splitMode === "equal" && (
    //       <h1 className="text-white text-center mt-4 text-xl">$17.68</h1>
    //     )}

    //     {/* Add input fields */}
    //     <div></div>

    //     <button className="p-3 bg-white mx-auto block rounded-xl">
    //       Submit
    //     </button>
    //     <button className="p-3 bg-white mx-auto block rounded-xl">Share</button>
    //   </div>
    // </div>
  );
};

export default Home;
