import { useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import RedirectRoute from "./components/RedirectRoute";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Link from "./pages/Bio";
import Bio from "./pages/Bio";

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route
            path="/"
            element={
              <RedirectRoute url="/a/dashboard">
                <Home />
              </RedirectRoute>
            }
          />
          <Route path="a">
            <Route path="login" element={<Login />} />
            <Route path="signup/:username" element={<Signup />} />
            <Route path="signup" element={<Signup />} />
            <Route
              path="dashboard"
              element={
                <PrivateRoute url="/a/login">
                  <Dashboard />
                </PrivateRoute>
              }
            />
          </Route>
          <Route path="/:username" element={<Bio />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}

export default App;
