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
    <div className="flex  min-h-screen max-w-screen-xl mx-auto bg-zinc-950">
      <div className="m-14 w-full bg-zinc-800 rounded-2xl">
        <SplitType />

        {/* Error */}
        {/* {error && <p className="text-red-500">{error}</p>} */}

        {/* Result */}
        {/* <h1 className="flex flex-col my-7 sm:mt-10 text-4xl sm:text-5xl items-center font-medium text-white cursor-default">
          {amountPerPerson ? `$ ${amountPerPerson.toFixed(2)}` : "$0"}
        </h1> */}

        {error ? (
          <p className="flex flex-col w-3/4 mx-auto my-7 items-center font-medium cursor-default text-red-500">
            {error}
          </p>
        ) : (
          <h1 className="flex flex-col my-7 sm:mt-10 text-4xl sm:text-5xl items-center font-medium text-white cursor-default">
            {amountPerPerson ? `$ ${amountPerPerson.toFixed(2)}` : "$0"}
          </h1>
        )}

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-4 flex flex-col justify-center mx-auto"
        >
          <label className="ml-4 font-medium text-white text-left">
            Total Bill
          </label>
          <input
            type="number"
            name="totalBill"
            value={bill.totalBill}
            onChange={handleInputChange}
            className="min-w-[14rem] mx-auto"
          />
          <label className="ml-4 font-medium text-white text-left">
            Tip Percentage{" "}
          </label>
          <input
            type="number"
            name="tipPercentage"
            value={bill.tipPercentage}
            onChange={handleInputChange}
            className="min-w-[14rem] mx-auto"
          />
          <label className="ml-4 font-medium text-white text-left">
            Number of People
          </label>
          <input
            type="number"
            name="peopleCount"
            value={bill.peopleCount}
            onChange={handleInputChange}
            className="min-w-[14rem] mx-auto"
          />

          {/* submit button */}
          <button
            type="submit"
            className="w-fit h-fit p-1 mx-auto font-medium sm:text-xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg"
          >
            Calculate
          </button>

          {amountPerPerson > 0 && !error && (
            <button
              type="button"
              onClick={clearForm}
              className="w-fit h-fit p-1 mx-auto font-medium sm:text-xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg"
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
