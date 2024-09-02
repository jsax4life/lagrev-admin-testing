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
import AllUsers from "../pages/Users"
import UserProfileDetails from "../pages/Users/UserDetails";
import UpdateUserProfile from "../pages/Users/UpdateUserDetails";
import AddNewUser from "../pages/Users/AddUser";
import PrivateRoute from './PrivateRoute';


function Router() {
  const routes = [

    // {
    //   path: "/",
    //   element: <SideMenu isDashboard = {true} />,
    //   children: [
     
    //     {
    //       path: "/dashboard",
    //       element: <PointOfSale />,
    //     },
       
     
      
    //   ],
    // },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },

    {
      // path: "/",
      element: <PrivateRoute />,

      children: [
     
       {
        element: <SideMenu isDashboard = {false} />,

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
  
          { path: "/admin-profile", element: <AdminProfile />},
  
          { path: "/edit-admin-profile", element: <EditAdminProfile />},
          { path: "/users", element: <AllUsers />},
          { path: "/user-profile/:id", element: <UserProfileDetails />},
          { path: "/edit-user-profile/:id", element: <UpdateUserProfile />},
          { path: "/add-user", element: <AddNewUser />},
  
        ]

       },

        // {
 
        //   path: "/vehicle",
        //   element: <Vehicle />,
        // },
      
        // { path: "/profile/:id", element: <ProfileDetails />},

        // { path: "/update-profile/:id", element: <UpdateVehicleProfile />},

        // { path: "/admin-profile", element: <AdminProfile />},

        // { path: "/edit-admin-profile", element: <EditAdminProfile />},
        // { path: "/users", element: <AllUsers />},
        // { path: "/user-profile/:id", element: <UserProfileDetails />},
        // { path: "/edit-user-profile/:id", element: <UpdateUserProfile />},
        // { path: "/add-user", element: <AddNewUser />},

      
      ],
    },



 
    // {
    //   path: "/top-menu",
    //   element: <TopMenu />,
    //   children: [
  
       
    //     {
    //       path: "dashboard",
    //       element: <PointOfSale />,
    //     },
      
     
     
      
       
     
       
      
      
      
    //   ],
    // },
   
  
  ];

  return useRoutes(routes);
}

export default Router;
