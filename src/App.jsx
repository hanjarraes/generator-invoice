import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./assets/scss/styles.scss";
import "remixicon/fonts/remixicon.css";

import Login from "./pages/Login";
import routes from "./routes";
import TheLayout from "./container/TheLayout";
import CreateInvoice from "./pages/Invoice/CreateInvoice";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<TheLayout />}>
            {routes}
            <Route path="/data-invoice/create" element={<CreateInvoice />} />
          </Route>
        </Routes>
      </BrowserRouter>

      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        icon
      />
    </>
  );
}

export default App;
