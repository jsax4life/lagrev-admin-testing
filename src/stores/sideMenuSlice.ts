import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { icons } from "../base-components/Lucide";
import { Menu, Popover } from "../base-components/Headless";

export interface Menu {
  icon: keyof typeof icons;
  title: string;
  pathname?: string;
  subMenu?: Menu[];
  ignore?: boolean;
}

export interface SideMenuState {
  menu: Array<Menu | "divider">;
}

const initialState: SideMenuState = {
  menu: [
    {
      icon: "LayoutDashboard",
      pathname: "/dashboard",
      title: "Dashboard",

    
    },
    {
      icon: "MapPin",
      title: "Vehicles",
      pathname: "/vehicle",

    },
 
    // "divider",
 
    {
      icon: "Users",
      title: "Users",
      subMenu: [
        {
          icon: "User",
          pathname: "/users-layout-1",
          title: "All Users",
        },
        {
          icon: "User",
          pathname: "/users-layout-2",
          title: "Add new User",
        },
        {
          icon: "User",
          pathname: "/users-layout-3",
          title: "Attendance",
        },
        {
          icon: "User",
          pathname: "/users-layout-3",
          title: "Performance",
        },
        {
          icon: "User",
          pathname: "/users-layout-3",
          title: "Role Management",
        },
      ],
    },
    {
      icon: "Lock",
      title: "Security",
   
    },

    "divider",

  ],
};

export const sideMenuSlice = createSlice({
  name: "sideMenu",
  initialState,
  reducers: {},
});

export const selectSideMenu = (state: RootState) => state.sideMenu.menu;

export default sideMenuSlice.reducer;
