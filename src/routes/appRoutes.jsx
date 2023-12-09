import React from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import Dashboard from "../pages/Dashboard"
import Invoice from "../pages/Invoice";


const appRoutes = [
  {
    path: "/dashboard",
    element: <Dashboard />,
    state: "dashboard",
    sidebarProps: {
      displayText: "Dashboard",
      icon: <DashboardIcon />
    }
  },
  {
    path: "/data-invoice",
    element: <Invoice />,
    state: "data-invoice",
    sidebarProps: {
      displayText: "Data Invoice",
      icon: <CollectionsBookmarkIcon />
    }
  },
  {
    path: "/userManagement",
    element: <Dashboard />,
    state: "userManagement",
    sidebarProps: {
      displayText: "User Management",
      icon: <ManageAccountsIcon />
    }
  }
];

export default appRoutes;