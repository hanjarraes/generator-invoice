import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import colorConfigs from "../../configs/colorConfigs";
import sizeConfigs from "../../configs/sizeConfigs";
import Sidebar from "../common/Sidebar";
import Modal from "../../components/Modal";
import { logoutUser } from "../../Service";
import { setUser } from "../../store/storeLogin";

const TheLayout = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.login.user);
  // const [expiredTime, setExpiredTime] = useState(false);

  // useEffect(() => {
  //   let timer = null;
  //   const handleMouseMove = () => {
  //     if (timer) clearTimeout(timer);
  //     timer = setTimeout(() => {
  //       setExpiredTime(true);
  //       const payload = { last_access: new Date().toLocaleString() };
  //       axios.post(`auth/logout`, payload);
  //     }, 7500000);
  //   };
  //   window.addEventListener("mousemove", handleMouseMove);
  // }, []);

  useEffect(() => {
    if (user) {
      axios.defaults.baseURL = process.env.REACT_APP_API_URL;
      axios.defaults.paramsSerializer = { indexes: null };
      axios.defaults.headers.common["Content-Type"] = "application/json";
      axios.defaults.headers.common.Accept = "application/json";
      axios.defaults.headers.common.Authorization = `Bearer ${user.token}`;
      axios.defaults.timeout = 500000;
      axios.interceptors.request.use((request) => request);
  
      axios.interceptors.response.use(
        (response) => response,
        (error) => {
          if (error?.response?.status === 403) {
            logoutUser({ dispatch, setData: setUser, navigate })
          }
          return Promise.reject(error);
        }
      );
    }
  }, [dispatch, navigate, user]);
  
  useEffect(() => {
    if (user) {
    } else {
      navigate("/login");
    }
  }, [user, navigate]);

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
        <Toolbar className="d-none d-lg-block" />
        <Outlet />
      </Box>
    </Box>
  );
};

export default TheLayout;
