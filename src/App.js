import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Sales from "./components/Sales";
import CreateSale from "./pages/CreateSale";
import UpdateSale from "./pages/UpdateSale";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Sales />} />
        <Route exact path="/create" element={<CreateSale />} />
        <Route exact path="/update/:id" element={<UpdateSale />} />
      </Routes>
    </Router>
  );
}
