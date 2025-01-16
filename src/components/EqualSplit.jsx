import React, { useState } from "react";
import SplitType from "./SplitType";

const EqualSplit = () => {
  const [bill, setBill] = useState({
    totalBill: "",
    tipPercentage: "",
    peopleCount: "",
  });

  const [amountPerPerson, setAmountPerPerson] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (!/^[0-9]*\.?[0-9]*$/.test(value) && value !== "") {
      setError("Please enter a valid number.");
      return;
    }
    setError("");
    setBill((prevBill) => ({ ...prevBill, [name]: value }));
    //setBill((prevBill) => ({ ...prevBill, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    const totalBill = parseFloat(bill.totalBill);
    const tipPercentage = parseFloat(bill.tipPercentage);
    const peopleCount = parseFloat(bill.peopleCount);

    if (peopleCount <= 0) {
      setError("Number of people must be greater than 0.");
      return;
    }
    if (totalBill <= 0) {
      setError("Total bill must be greater than 0.");
      return;
    }
    if (tipPercentage < 0) {
      setError("Tip percentage cannot be negative.");
      return;
    }

    setError("");

    const withTip = totalBill * (tipPercentage / 100);
    setAmountPerPerson((withTip + totalBill) / peopleCount);
  };

  const clearForm = () => {
    setBill({
      totalBill: "",
      tipPercentage: "",
      peopleCount: "",
    });

    setAmountPerPerson(null);
  };

  return (
    <div className="flex min-h-screen max-w-screen-xl mx-auto bg-zinc-950">
      <div className="m-14 w-full bg-zinc-800 rounded-2xl">
        <SplitType />

        {/* Error */}
        {/* {error && <p className="text-red-500">{error}</p>} */}

        {/* Result */}
        {/* <h1 className="flex flex-col my-7 sm:mt-10 text-4xl sm:text-5xl items-center font-medium text-white cursor-default">
          {amountPerPerson ? `$ ${amountPerPerson.toFixed(2)}` : "$0"}
        </h1> */}

        {error ? (
          <p className="flex flex-col w-3/4 mx-auto my-7 sm:my-10 sm:text-xl items-center font-medium cursor-default text-red-500">
            {error}
          </p>
        ) : (
          <h1 className="flex flex-col my-7 sm:my-10 text-4xl sm:text-7xl items-center font-medium text-white cursor-default">
            {amountPerPerson ? `$ ${amountPerPerson.toFixed(2)}` : "$0"}
          </h1>
        )}

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-6 sm:space-y-8 max-w-xl w-full mx-auto items-center justify-center"
        >
          <input
            type="number"
            name="totalBill"
            value={bill.totalBill}
            onChange={handleInputChange}
            className="p-3 sm:w-[20rem] md:w-[25rem] sm:p-5 mx-auto rounded-md"
            placeholder="Total Bill"
          />

          <input
            type="number"
            name="tipPercentage"
            value={bill.tipPercentage}
            onChange={handleInputChange}
            className="p-3 sm:w-[20rem] md:w-[25rem]  mx-auto sm:p-5 rounded-md"
            placeholder="Tip Percentage"
          />

          <input
            type="number"
            name="peopleCount"
            value={bill.peopleCount}
            onChange={handleInputChange}
            className="p-3 sm:w-[20rem] md:w-[25rem]  mx-auto sm:p-5 rounded-md"
            placeholder="Number of People"
          />

          {/* submit button */}
          <button
            type="submit"
            className="w-fit h-fit p-1 sm:p-3 mx-auto font-medium sm:text-3xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg"
          >
            Calculate
          </button>

          {amountPerPerson > 0 && !error && (
            <button
              type="button"
              onClick={clearForm}
              className="w-fit h-fit p-1 sm:p-3 mx-auto font-medium sm:text-3xl text-white bg-red-500 hover:bg-red-800 rounded-lg"
            >
              Clear
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default EqualSplit;
