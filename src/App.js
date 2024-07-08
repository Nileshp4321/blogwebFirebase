import React, { useState } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import NavBar from "./common/components/Navbar/NavBar.jsx";
import Home from "./common/components/Home/Home.jsx";
import Login from "./common/components/LoginPage/Login.jsx";
import RetailerRoutes from "./verticals/retailer/navigations/RetailerRoutes";
import ConsumerRoutes from "./verticals/consumer/navigations/ConsumerRoutes";
import { User } from "./context/UserType.js";
import About from "./common/components/Home/About.jsx";
import Contact from "./common/components/Home/Contact.jsx";
import PaymentReceipt from "./verticals/consumer/pages/PaymentReceipt.jsx";
import OrderHistroy from "./verticals/consumer/pages/OrderHistroy.jsx";
import ProductItems from "./common/Blogs.js";



function App() {
  const [userRole, setUserRole] = useState('retailer');
  const [user, setUser] = useState(null);
  // const {Token}=localStorage.getItem("userLogInfo");

  const navBarItem = ['Home', 'About', 'Contact', 'Login']
  return (
    <BrowserRouter>
      <User.Provider value={{ userRole, setUserRole, user, setUser }}>

        {user ? null : <NavBar navBarItem={navBarItem} />}

        <Routes>
          <Route path="/" element={<ProductItems />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>

          <Route
            path="/retailer/*"
            element={
              user ? (
                <RetailerRoutes />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/consumer/payment"
            element={
              user ? (
                <OrderHistroy />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/consumer/*"
            element={
              user ? (
                <ConsumerRoutes />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        </Routes>
      </User.Provider>
    </BrowserRouter>
  );
}

export default App;
