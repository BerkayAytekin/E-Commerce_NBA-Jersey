import React from "react";

import { useAuth } from "../../contexts/AuthContext";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedAdmin() {
  const protectAdminData = useAuth();
  return (
    <div>
      {protectAdminData.loggedIn && protectAdminData.user.role === "admin" ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </div>
  );
}

export default ProtectedAdmin;
