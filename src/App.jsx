import { useState } from "react";
import "./App.css";
import BillInput from "./components/BillInput";
import EqualSplit from "./components/EqualSplit";
import CustomSplit from "./components/CustomSplit";

function App() {
  return (
    <div>
      <CustomSplit />
      {/* <EqualSplit /> */}
      {/* <BillInput /> */}
    </div>
  );
}

export default App;
