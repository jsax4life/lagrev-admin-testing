import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";

import PointOfSale from "../pages/PointOfSale";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Vehicle from "../pages/Vehicles"
import ProfileDetails from "../pages/Vehicles/VehicleDetails";
import UpdateVehicleProfile from "../pages/Vehicles/UpdateVehicleProfile";

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
      
        { path: "/profile/:id", element: <ProfileDetails />},

        { path: "/update-profile/:id", element: <UpdateVehicleProfile />},

      
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
