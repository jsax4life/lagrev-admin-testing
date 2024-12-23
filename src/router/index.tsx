import { useRoutes } from "react-router-dom";
import SideMenu from "../layouts/SideMenu";
import SimpleMenu from "../layouts/SimpleMenu";
import TopMenu from "../layouts/TopMenu";

import Dashboard from "../pages/Dashboard";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Vehicle from "../pages/Vehicles"
import ProfileDetails from "../pages/Vehicles/VehicleDetails";
import UpdateVehicleProfile from "../pages/Vehicles/UpdateVehicleProfile";
import AdminProfileDetails from "../pages/Admins/AdminDetails";
import EditAdminProfile from "../pages/Admins/AdminProfile/EditProfile"
import AllUsers from "../pages/Users"
import UserProfileDetails from "../pages/Users/UserDetails";
import UpdateUserProfile from "../pages/Users/UpdateUserDetails";
import UpdateAdminProfile from "../pages/Admins/UpdateAdminDetails";

import AddNewUser from "../pages/Users/AddUser";
import PrivateRoute from './PrivateRoute';
import RolePrivilegesTable from "../pages/Users/RoleManagement";
import AllAdmins from "../pages/Admins"
import Survey from "../pages/Surevy"
import SurveyResponse from "../pages/Surevy/ViewResponse"

import AdminRolePrivilegesTable from "../pages/Admins/AdminRoleManagement";
import AddNewAdmiin from "../pages/Admins/AddAdmin";


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
            element: <Dashboard />,
          },
          {
 
            path: "/vehicle",
            element: <Vehicle />,
          },
        
          { path: "/profile/:id", element: <ProfileDetails />},
  
          { path: "/update-profile/:id", element: <UpdateVehicleProfile />},
  
  
          { path: "/edit-admin-profile/:id", element: <UpdateAdminProfile />},
          { path: "/users", element: <AllUsers />},


          { path: "/user-profile/:id", element: <UserProfileDetails />},
          { path: "/edit-user-profile/:id", element: <UpdateUserProfile />},
          { path: "/add-user", element: <AddNewUser />},

          {path: "/role-management", element: <RolePrivilegesTable/>},
          {path: "/admin-role-management", element: <AdminRolePrivilegesTable/>},
          { path: "/admin-profile/:id", element: <AdminProfileDetails />},


          { path: "/admins", element: <AllAdmins />},
          { path: "/add-admin", element: <AddNewAdmiin />},
          { path: "/survey", element: <Survey />},
          { path: "/survey-responses/:surveyId", element: <SurveyResponse />},

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
