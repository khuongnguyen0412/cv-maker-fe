import { RouteObject } from "react-router-dom";
import Home from "../pages/home";
import CVList from "../pages/cv";

const routes: RouteObject[] = [
  { path: "/", element: <Home /> },
  { path: "/my-cv", element: <CVList /> },
];
export default routes;
