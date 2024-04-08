import React from "react";
import { Link, Outlet } from "react-router-dom";
import "./styles.css";
function Admin() {
  return (
    <div>
      <nav>
        <ul className="admin-menu">
          <li>
            <Link to="adminhome">Admin Home</Link>
          </li>
          <li>
            <Link to="adminorders">Orders</Link>
          </li>
          <li>
            <Link to="adminproducts">Products</Link>
          </li>
        </ul>
        <Outlet></Outlet>
      </nav>
    </div>
  );
}

export default Admin;
