import { Routes, Route, Navigate } from "react-router-dom";
import { Home } from "../../pages/Home/Home";
import { Register } from "../../pages/Register/Register";
import { Login } from "../../pages/Login/Login";
import { Profile } from "../../pages/Profile/Profile";
import { Services } from "../../pages/Services/Services";
import { SuperAdminPanel } from "../../pages/SuperAdminPanel/SuperAdmin";



export const Body = () => {
  return (
    <Routes>
      <Route path="*" element={<Navigate to={"/"} replace/>} />
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/services" element={<Services />} />
      <Route path="/superadminpanel" element={<SuperAdminPanel />} />
    </Routes>
  );
};