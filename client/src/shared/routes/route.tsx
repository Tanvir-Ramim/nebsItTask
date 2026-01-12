import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Home from "../../pages/home/Home";
import  CreateNotice from "../../pages/CraeteNotice/CreateNotice";



const Router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Home></Home>,
      },
      {
        path: "/craete-notice",
        element: <CreateNotice></CreateNotice>,
      },
    ],
  },
]);

export default Router;
