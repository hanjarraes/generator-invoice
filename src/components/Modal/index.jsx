import React from "react";
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';
import { useNavigate } from "react-router-dom";
import appRoutes from "../../routes/appRoutes";
import "./style.scss";


const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="top" ref={ref} {...props} />;
});

const Modal = ({ open, handleClose }) => {
    const navigate = useNavigate()
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            fullScreen
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
            className="custom-dialog"
        >
            <div className="content-modal">
                <div className="close-burger">
                    <i onClick={() => handleClose()} className="ri-close-fill" />
                </div>
                {appRoutes.map((route, index) =>
                    route.sidebarProps ? (
                        route.child ? (
                            // <SidebarItemCollapse item={route} key={index} />
                            <div key={index}>
                                <button className="btn route-mobile" onClick={() => {
                                    navigate(route.path)
                                    handleClose()
                                }}>
                                    {route.sidebarProps.displayText}
                                </button>
                            </div>
                        ) : (
                            <div key={index}>
                                <button className="btn route-mobile" onClick={() => {
                                    navigate(route.path)
                                    handleClose()
                                }}>
                                    {route.sidebarProps.displayText}
                                </button>
                            </div>
                            // <SidebarItem item={route} key={index} />
                        )
                    ) : null
                )}
            </div>
        </Dialog>
    );
}

export default Modal;
