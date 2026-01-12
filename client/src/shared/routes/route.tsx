import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../../pages/home/Home";



const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
    ],
  },
]);

export default Router;
