import React, { useState } from "react";
import SplitType from "./SplitType";

const CustomSplit = () => {
  const [bill, setBill] = useState({
    totalBill: "",
    tipPercentage: "",
    contributors: [
      {
        name: "",
        amount: "",
      },
    ],
  });

  const [error, setError] = useState("");
  const [breakdownSplit, setBreakdownSplit] = useState({});

  const handleInputChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "tipPercentage") {
      setBill((prevBill) => ({
        ...prevBill,
        tipPercentage: parseFloat(value) || 0,
      }));
    } else if (name === "totalBill") {
      setBill((prevBill) => ({
        ...prevBill,
        totalBill: parseFloat(value) || 0,
      }));
    } else {
      const updatedContributors = [...bill.contributors];
      updatedContributors[index][name] = value;
      setBill((prevBill) => ({
        ...prevBill,
        contributors: updatedContributors,
      }));
    }
  };

  const handleNewContributor = () => {
    setBill((prevBill) => ({
      ...prevBill,
      contributors: [...prevBill.contributors, { name: "", amount: "" }],
    }));
  };

  //   const handleSubmit = (e) => {
  //     e.preventDefault();
  //     const { tipPercentage, contributors } = bill;

  //     if (tipPercentage < 0) {
  //       setError("Tip Percentage cannot be negative.");
  //     }
  //     if (contributors.amount <= 0) {
  //       setError("Amount must be greate than 0.");
  //     }
  //   };

  // Handle form submission (calculating the split)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for calculating the breakdown or handling any errors can be added here
    const totalAmount = bill.contributors.reduce(
      (acc, contributor) => acc + parseFloat(contributor.amount),
      0
    );

    if (totalAmount <= 0) {
      setError("Total amount must be greater than 0.");
      return;
    }

    // Calculate the breakdown per contributor based on the tip percentage
    const tipAmount = (totalAmount * bill.tipPercentage) / 100;
    const totalWithTip = totalAmount + tipAmount;

    // Example: breakdown of the split (this is just an example logic)
    const breakdown = bill.contributors.map((contributor) => {
      const contributorShare =
        (contributor.amount / totalAmount) * totalWithTip;
      return {
        name: contributor.name,
        share: contributorShare.toFixed(2),
      };
    });

    setBreakdownSplit(breakdown);
    setError(""); // Clear any previous errors
  };

  return (
    <div className="flex min-h-screen max-w-screen-xl mx-auto bg-zinc-950">
      <div className="m-14 w-full bg-zinc-800 rounded-2xl">
        <SplitType />

        {/* Display error if any */}
        {error && (
          <p className="flex flex-col w-3/4 mx-auto my-7 sm:my-10 sm:text-xl items-center font-medium cursor-default text-red-500">
            {error}
          </p>
        )}

        {/* form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col mt-4 space-y-6 sm:space-y-8 max-w-xl w-full mx-auto items-center justify-center"
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
            className="p-3 sm:w-[20rem] md:w-[25rem] sm:p-5 mx-auto rounded-md"
            placeholder="Tip Percentage"
          />

          <div className="flex flex-col mx-auto items-center justify-center space-y-6  sm:space-y-8">
            <ul className="flex mx-auto items-center">
              {bill.contributors.map((contributor, index) => (
                <li
                  key={index}
                  className="w-full max-w-md flex flex-col space-y-6 sm:space-y-8 items-center"
                >
                  <input
                    type="text"
                    name="name"
                    value={contributor.name}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Name"
                    className="p-3 sm:w-[20rem] md:w-[25rem] sm:p-5 mx-auto rounded-md"
                  />

                  <input
                    type="number"
                    name="amount"
                    value={contributor.amount}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Amount"
                    className="p-3 sm:w-[20rem] md:w-[25rem] sm:p-5 mx-auto rounded-md"
                  />
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={handleNewContributor}
              className="w-fit h-fit p-1 sm:p-3 font-medium sm:text-xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg"
            >
              + Add Contributor
            </button>
          </div>

          <button
            type="submit"
            className="w-fit h-fit p-1 sm:p-3 mx-auto font-medium sm:text-3xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg"
          >
            Calculate
          </button>
        </form>

        {/* Display the breakdown of the split if available */}
        {breakdownSplit.length > 0 && (
          <div>
            <h2>Breakdown:</h2>
            <ul>
              {breakdownSplit.map((contributor, index) => (
                <li key={index}>
                  {contributor.name}: ${contributor.share}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomSplit;

// Error not showing
//Result has no design yet
//I'm not sure if logic is right
