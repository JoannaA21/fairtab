import React, { useState } from "react";
import SplitType from "./SplitType";

const CustomSplit = () => {
  const [bill, setBill] = useState({
    totalBill: 0,
    tipPercentage: 0,
    contributors: [
      {
        name: "",
        amount: 0,
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
      contributors: [...prevBill.contributors, { name: "", amount: 0 }],
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
      (acc, contributor) => acc + parseFloat(contributor.amount || 0),
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
    <div className="flex  min-h-screen max-w-screen-xl mx-auto bg-zinc-950">
      <div className="m-14 w-full bg-zinc-800 rounded-2xl">
        <SplitType />
        <form onSubmit={handleSubmit}>
          <div>
            <ul>
              {bill.contributors.map((contributor, index) => (
                <li key={index}>
                  <label>Name</label>
                  <input
                    type="text"
                    name="name"
                    value={contributor.name}
                    onChange={(e) => handleInputChange(e, index)}
                  />

                  <label>Amount</label>
                  <input
                    type="number"
                    name="amount"
                    value={contributor.amount}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                </li>
              ))}
            </ul>
            <button type="button" onClick={handleNewContributor}>
              + Add Contributor
            </button>
          </div>

          {/* <label>Bill</label>
        <input
          type="number"
          name="totalBill"
          value={bill.totalBill}
          onChange={handleInputChange}
        /> */}
          <label>Tip Percentage</label>
          <input
            type="number"
            name="tipPercentage"
            value={bill.tipPercentage}
            onChange={handleInputChange}
          />

          <button type="submit">Calculate</button>
        </form>

        {/* Display error if any */}
        {error && <p className="error">{error}</p>}

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
