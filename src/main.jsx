import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "./index.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home/Home";
import Games from "./pages/videogames/Games";
/* import GamesDetails, { filmDetailsLoader } from "./pages/GamesDetails/GamesDetails"; */
import ErrorPage from "./pages/ErrorPage/ErrorPage";

function AppLayout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/Games", element: <Games /> },
     /*  { path: "/gamesDetails/:id", element: <GamesDetails />, loader: filmDetailsLoader }, */
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
