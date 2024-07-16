import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";

import PointOfSale from "../pages/PointOfSale";
import Login from "../pages/Login";
import Register from "../pages/Register";


function Router() {
  const routes = [
    {
      path: "/dashboard",
      element: <SideMenu />,
      children: [
     
        {
          path: "/dashboard",
          element: <PointOfSale />,
        },
       
      
      
      
      ],
    },
 
    {
      path: "/top-menu",
      element: <TopMenu />,
      children: [
  
       
        {
          path: "dashboard",
          element: <PointOfSale />,
        },
      
     
     
      
       
     
       
      
      
      
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  
  ];

  return useRoutes(routes);
}

export default Router;
