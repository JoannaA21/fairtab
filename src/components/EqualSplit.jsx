import React, { useState } from "react";
import SplitType from "./SplitType";

const EqualSplit = () => {
  const [bill, setBill] = useState({
    totalBill: 0,
    tipPercentage: 0,
    peopleCount: 0,
  });

  const [amountPerPerson, setAmountPerPerson] = useState(null);
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setBill((prevBill) => ({ ...prevBill, [name]: parseFloat(value) || 0 }));
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the form from reloading the page
    const { totalBill, tipPercentage, peopleCount } = bill;

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

  return (
    <div className="flex  min-h-screen max-w-screen-xl mx-auto bg-black">
      <div className="m-14 w-full bg-slate-800 rounded-2xl">
        <SplitType />
        {error && <p className="text-red-500">{error}</p>}
        <h1>
          {amountPerPerson ? `$${amountPerPerson.toFixed(2)}` : "Enter details"}
        </h1>
        <form onSubmit={handleSubmit}>
          <label>Total Bill</label>
          <input
            type="number"
            name="totalBill"
            value={bill.totalBill}
            onChange={handleInputChange}
          />
          <label>Tip Percentage </label>
          <input
            type="number"
            name="tipPercentage"
            value={bill.tipPercentage}
            onChange={handleInputChange}
          />
          <label>Number of People</label>
          <input
            type="number"
            name="peopleCount"
            value={bill.peopleCount}
            onChange={handleInputChange}
          />

          <button type="submit">Calculate</button>
        </form>
      </div>
    </div>
  );
};

export default EqualSplit;
