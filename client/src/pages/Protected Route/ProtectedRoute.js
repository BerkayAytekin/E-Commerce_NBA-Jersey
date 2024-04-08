import React from "react";

import { Outlet, Navigate } from "react-router-dom";

import { useAuth } from "../../contexts/AuthContext";

function ProtectedRoute() {
  const protectedData = useAuth();

  console.log(protectedData.loggedIn);

  return (
    <>
      {protectedData.loggedIn ? (
        <Outlet></Outlet>
      ) : (
        <Navigate to="/"></Navigate>
      )}
    </>
  );
}

export default ProtectedRoute;
