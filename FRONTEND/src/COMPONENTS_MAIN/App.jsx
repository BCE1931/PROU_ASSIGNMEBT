import React from "react";
import TaskManagerApp from "./TaskManagerApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Card1 from "./Card1";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  const PublicRoute = ({ element }) => {
    return localStorage.getItem("username") ? (
      <Navigate to="/home" replace />
    ) : (
      element
    );
  };

  const ProtectedRoute = ({ element }) => {
    return localStorage.getItem("username") ? (
      element
    ) : (
      <Navigate to="/" replace />
    );
  };
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={<PublicRoute element={<Signup />} />}
          />
          <Route path="/" element={<PublicRoute element={<Card1 />} />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<TaskManagerApp />} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
