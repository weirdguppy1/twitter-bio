import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import RedirectRoute from "./components/RedirectRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import UserInit from "./components/SignupInput";
import Signup from "./pages/Signup";
import Login from "./pages/Login";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectRoute url="/dashboard">
                <Home />
              </RedirectRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route
            path="/dashboard"
            element={
              <PrivateRoute url="/login">
                <Dashboard />
              </PrivateRoute>
            }
          />
          {/* <Route
            path="/init"
            element={
              <UserInit />
            }
          /> */}
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
