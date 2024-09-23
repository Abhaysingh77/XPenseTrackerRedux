import React from "react";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import TransactionPage from "./components/TransactionPage/TransactionPage";
import  { Routes, Route } from "react-router-dom";
function App() {
  return (
    <>
      <h1 className="app_title">xTracker</h1>
      <Routes>
        <Route path="/" element={<LandingPage />}/>
        <Route path="/tracker" element={<TransactionPage />}/>
      </Routes>
    </>
  );
}

export default App;
