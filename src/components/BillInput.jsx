import { useState } from "react";

const BillInput = () => {
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
      <div className="m-4 w-96 h-110 rounded-2xl bg-neutral-900">
        {/* toggle button */}
        <button
          onClick={toggleSplitMode}
          className="p-2 mt-3 mx-auto block rounded-lg bg-gray-500 hover:bg-neutral-50"
        >
          {splitMode === "equal" ? "Even Split" : "Custom Split"}
        </button>

        {/* Result for Equal Split here */}
        {splitMode === "equal" && (
          <h1 className="text-white text-center mt-4 text-xl">$17.68</h1>
        )}

        {/* Add input fields */}
        <div></div>

        <button className="p-3 bg-white mx-auto block rounded-xl">
          Submit
        </button>
        <button className="p-3 bg-white mx-auto block rounded-xl">Share</button>
      </div>
    </div>
  );
};

export default BillInput;
