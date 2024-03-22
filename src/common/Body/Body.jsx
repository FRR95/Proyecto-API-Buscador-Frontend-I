import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";



export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} replace/>} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
};