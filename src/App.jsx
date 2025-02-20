import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Provider } from "jotai"; // You can omit this if you want to keep the app simple
import Login from "./components/Login/Login";
import Home from "./components/Home";
import Protected from "./components/Auth/Protected";
import EmployeeDetailsPage from "./components/View_Details/EmployeeDetailsPage";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Provider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <Protected>
                <Home />
              </Protected>
            }
          />
          <Route
            path="/home/employee/:id"
            element={
              <Protected>
                <EmployeeDetailsPage />
              </Protected>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
