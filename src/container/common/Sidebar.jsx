import React from "react";
import { Avatar, Drawer, List, Stack, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import appRoutes from "../../routes/appRoutes";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import LogoIbsi from "../../assets/img/Logo/logo.png";
import { logoutUser } from "../../Service";
import { setUser } from "../../store/storeLogin";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser({ dispatch, setData: setUser, navigate })
  };

  const storedJsonString = localStorage.getItem('userLogin');
  const dataUserLogin = JSON.parse(storedJsonString);
  const modulesUser  = dataUserLogin?.data?.modules
  const filteredRoutes = appRoutes.filter(data => modulesUser?.includes(data?.sidebarProps?.displayText));

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: sizeConfigs.sidebar.width,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: sizeConfigs.sidebar.width,
          boxSizing: "border-box",
          borderRight: "0px",
          backgroundColor: colorConfigs.sidebar.bg,
          color: colorConfigs.sidebar.color,
        },
      }}
    >
      <List disablePadding>
        <Toolbar sx={{ marginBottom: "20px", marginTop: "20px" }}>
          <Stack sx={{ width: "100%" }} direction="row" justifyContent="center">
            <Avatar
              src={LogoIbsi}
              style={{
                height: 100,
                width: "auto",
                background: "#fff",
                padding: "10px",
              }}
            />
          </Stack>
        </Toolbar>
        {filteredRoutes.map((route, index) =>
          route.sidebarProps ? (
            route.child ? (
              <SidebarItemCollapse item={route} key={index} />
            ) : (
              <SidebarItem item={route} key={index} />
            )
          ) : null
        )}
      </List>
      <Toolbar sx={{ marginBottom: "20px", marginTop: "20px" }}>
        <div onClick={handleLogout} className="logout-btn">
          <div className="item-logout">
            <i className="ri-logout-circle-line" /> Logout
          </div>
        </div>
      </Toolbar>
    </Drawer>
  );
};

export default Sidebar;
