import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Signin from "./pages/auth/signin";
import Signup from "./pages/auth/signup";
import Products from "./pages/Products";
import ProductDetail from "./pages/Product Detail";
import Profile from "./pages/Profile";
import ProtectedRoute from "./pages/Protected Route/ProtectedRoute";
import Basket from "./pages/Basket";
import Error from "./pages/Error";
import ProtectedAdmin from "./pages/Protected Route/ProtectedAdmin";
import Admin from "./pages/Admin";
import AdminHome from "./pages/Admin/Admin Home";
import AdminOrders from "./pages/Admin/Orders";
import AdminProducts from "./pages/Admin/Products";
import AdminProductDetail from "./pages/Admin/Product Detail";
import NewProduct from "./pages/Admin/New Product";

function App() {
  return (
    <div className="App">
      <Navbar></Navbar>
      <div id="content">
        <Routes>
          <Route path="/" element={<Products></Products>}></Route>
          <Route
            path="/product/:_id"
            element={<ProductDetail></ProductDetail>}
          ></Route>
          <Route path="signin" element={<Signin></Signin>}></Route>
          <Route path="signup" element={<Signup></Signup>}></Route>
          <Route element={<ProtectedRoute></ProtectedRoute>}>
            <Route path="/profile" element={<Profile></Profile>}></Route>
          </Route>
          <Route path="/basket" element={<Basket></Basket>}></Route>
          <Route path="*" element={<Error></Error>}></Route>
          <Route element={<ProtectedAdmin></ProtectedAdmin>}>
            <Route path="/admin" element={<Admin></Admin>}>
              <Route path="adminhome" element={<AdminHome></AdminHome>}></Route>
              <Route
                path="adminorders"
                element={<AdminOrders></AdminOrders>}
              ></Route>
              <Route
                path="adminproducts"
                element={<AdminProducts></AdminProducts>}
              ></Route>
              <Route
                path="adminproducts/:product_id"
                element={<AdminProductDetail></AdminProductDetail>}
              ></Route>
              <Route
                path="newproducts"
                element={<NewProduct></NewProduct>}
              ></Route>
            </Route>
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
