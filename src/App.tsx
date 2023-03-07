import { Routes, Route } from "react-router-dom";
import React from "react";
import { Wrapper } from "./layout/Wrapper";
import { HomePage } from "./pages/HomePage";

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Wrapper />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
