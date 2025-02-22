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
import Publishers from "./pages/publisher/publisher";
import PublisherDetails, { loader as publisherLoader } from "./pages/publisherDetails/PublisherDetails";
import Games from "./pages/videogames/Games";
import GamesDetails, { loader as gameLoader } from "./pages/GamesDetails/GamesDetails";
import GenreDetails from "./pages/generos/Genero";
import TagDetails from "./pages/tags/Tags";
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
      { path: "/GamesDetails/:id", element: <GamesDetails />, loader: gameLoader },
      { path: "/Publisher", element: <Publishers /> },
      { path: "/publishers/:id", element: <PublisherDetails />, loader: publisherLoader },
      { path: "/genres/:slug", element: <GenreDetails /> }, 
      { path: "/tags/:slug", element: <TagDetails /> },
    ],
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
