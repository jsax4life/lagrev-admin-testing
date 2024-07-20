import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";

import PointOfSale from "../pages/PointOfSale";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Vehicle from "../pages/Vehicles"

function Router() {
  const routes = [
    {
      path: "/",
      element: <SideMenu />,
      children: [
     
        {
          path: "/dashboard",
          element: <PointOfSale />,
        },
       
        {
          path: "/vehicle",
          element: <Vehicle />,
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
