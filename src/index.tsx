import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import RegisterPage from "./components/RegisterPage/RegisterPage";
import TopBar from "./components/common/NavigationBar/TopBar";
import LoginPage from "./components/LoginPage/LoginPage";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement,
);

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route
        path="/"
        element={<App />}
        errorElement={<h1>Oopsies, this page is not implemented yet...</h1>}
      />
      <Route path="register" element={<RegisterPage />} />
      <Route path="login" element={<LoginPage />} />
    </>,
  ),
);

root.render(
  <React.StrictMode>
    <TopBar>
      <li>
        <a href="/">Home</a>
      </li>
      <li>
        <a href="/register">Register</a>
      </li>
      <li>
        <a href="/login">Login</a>
      </li>
    </TopBar>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
