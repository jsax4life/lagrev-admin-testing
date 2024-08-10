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
import AdminProfile from "../pages/Profile";
import EditAdminProfile from "../pages/Profile/EditProfile"

function Router() {
  const routes = [

    {
      path: "/",
      element: <SideMenu isDashboard = {true} />,
      children: [
     
        {
          path: "/dashboard",
          element: <PointOfSale />,
        },
       
     
      
      ],
    },

    {
      path: "/",
      element: <SideMenu isDashboard = {false} />,
      children: [
     
       
        {
 
          path: "/vehicle",
          element: <Vehicle />,
        },
      
        { path: "/profile/:id", element: <ProfileDetails />},

        { path: "/update-profile/:id", element: <UpdateVehicleProfile />},

        { path: "/admin-profile", element: <AdminProfile />},

        { path: "/edit-admin-profile", element: <EditAdminProfile />},

      
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
