import React from "react";
import axios from "axios";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import AdminHome from "./components/AdminHome";
import ChildProfileForm from "./pages/ChildProfile";
import AddCoGuardians from "./pages/AddCoGuardians";

axios.defaults.baseURL = "http://localhost:8080";
axios.defaults.withCredentials = true;

const App = () => {
  const location = useLocation();

  // Show Navbar only for these routes
  const showNavbarRoutes = ["/", "/register", "/login"];

  return (
    <>
      {showNavbarRoutes.includes(location.pathname) && <Navbar />}
      <Toaster position="top" toastOptions={{ duration: 3000 }} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/addChildProfile" element={<ChildProfileForm />} />
        <Route path="/addCo-Guardians" element={<AddCoGuardians />} />

      </Routes>
    </>
  );
};

export default App;
