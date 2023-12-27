import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
import Modal from "../../components/Modal";

const TheLayout = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };
  console.log(open)
  return (
    <Box sx={{ display: "flex" }}>
      <Box
        className="d-none d-lg-flex"
        component="nav"
        sx={{
          width: sizeConfigs.sidebar.width,
          flexShrink: 0,
        }}
      >
        <Sidebar />
      </Box>
      <Modal open={open}
        handleClose={handleClose} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: `calc(100% - ${sizeConfigs.sidebar.width})`,
          minHeight: "100vh",
          backgroundColor: colorConfigs.mainBg,
        }}
      >
        <div onClick={() => setOpen(true)} className="d-flex d-lg-none burger-mobile">
          <i className="ri-menu-line" />
        </div>
        <Toolbar className="d-none d-lg-block"/>
        <Outlet />
      </Box>
    </Box>
  );
};

export default TheLayout;
