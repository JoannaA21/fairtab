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

  // Handle form submission (calculating the split)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic for calculating the breakdown
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

    //Breakdown of the split (this is just an example logic)
    const breakdown = bill.contributors
      .map((contributor) => {
        const contributorShare =
          (contributor.amount / totalAmount) * totalWithTip;
        return {
          name: contributor.name,
          share: contributorShare.toFixed(2),
        };
      })
      .filter((contributor) => contributor.name && contributor.share); // Filter out empty names and shares;

    setBreakdownSplit(breakdown);
    setError(""); // Clear any previous errors
  };

  //Restarts the form
  const clearForm = () => {
    setBill({
      totalBill: "",
      tipPercentage: "",
      contributors: [
        {
          name: "",
          amount: "",
        },
      ],
    });

    setBreakdownSplit({});
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

        {/* Form */}
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

          <div className="flex flex-col mx-auto items-center justify-center space-y-6 sm:space-y-8 ">
            <ul className="flex flex-col mx-auto items-center space-y-6 sm:space-y-8">
              {bill.contributors.map((contributor, index) => (
                <li
                  key={index}
                  className="w-full max-w-md flex flex-col items-center"
                >
                  <input
                    type="text"
                    name="name"
                    maxLength={10} // Limits input to 10 characters
                    value={contributor.name}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Name"
                    className="p-3 sm:w-[20rem] md:w-[25rem] sm:p-5 mx-auto border-b-2 border rounded-md"
                    required
                  />

                  <input
                    type="number"
                    name="amount"
                    value={contributor.amount}
                    onChange={(e) => handleInputChange(e, index)}
                    placeholder="Amount"
                    className="p-3 sm:w-[20rem] md:w-[25rem] sm:p-5 mx-auto border-t-2 border rounded-md"
                    required
                  />
                </li>
              ))}
            </ul>

            {/* Add contributor button */}
            <button
              type="button"
              onClick={handleNewContributor}
              className="w-fit h-fit p-1 sm:p-3 font-medium sm:text-xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg"
            >
              + Add Contributor
            </button>
          </div>

          {/* Calculate button */}
          <button
            type="submit"
            className="w-fit h-fit p-1 sm:p-3 mx-auto font-medium sm:text-3xl bg-zinc-300 hover:bg-zinc-950 hover:text-white rounded-lg"
          >
            Calculate
          </button>

          {/* Clear button */}
          {breakdownSplit.length > 0 && !error && (
            <button
              type="button"
              onClick={clearForm}
              className="w-fit h-fit p-1 sm:p-3 mx-auto font-medium sm:text-3xl text-white bg-red-500 hover:bg-red-800 rounded-lg"
            >
              Clear
            </button>
          )}
        </form>

        {/* Display the breakdown */}
        {breakdownSplit.length > 0 && (
          <div className="flex flex-col my-5 md:my-12 w-2/3 sm:w-[20rem] md:w-[25rem]  max-h-fit mx-auto rounded-md bg-white">
            <p className="mx-auto font-medium sm:text-xl md:text-2xl lg:text-3xl">
              Breakdown
            </p>
            <ul>
              {breakdownSplit.map((contributor, index) => (
                <li
                  key={index}
                  className="flex p-2 sm:px-10 lg:px-16 md:text-xl lg:text-2xl justify-between"
                >
                  <span>{contributor.name}</span>
                  <span>${contributor.share}</span>
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
