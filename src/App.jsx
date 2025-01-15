import { useState } from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import EqualSplit from "./components/EqualSplit";
import CustomSplit from "./components/CustomSplit";
import NotFound from "./components/NotFound";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/equalsplit" element={<EqualSplit />} />
          <Route path="/customsplit" element={<CustomSplit />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
      {/* <CustomSplit /> */}
      {/* <EqualSplit /> */}
      {/* <BillInput /> */}
    </div>
  );
}

export default App;
