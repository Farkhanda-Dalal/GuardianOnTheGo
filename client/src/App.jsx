import React from "react";
import axios from "axios"
import "./App.css";
import { Routes, Route } from "react-router-dom";
import {Toaster} from 'react-hot-toast'
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login"

axios.defaults.baseURL='http://localhost:8080';
axios.defaults.withCredentials=true;


const App = () => {
  return (
    <> 
      <Navbar></Navbar>
      <Toaster position="top" toastOptions={{duration:3000}}></Toaster>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        <Route path="/register" element={<Register></Register>}></Route>
        <Route path="/login" element={<Login></Login>}></Route>
      </Routes>
    </>
  );
};

export default App;
