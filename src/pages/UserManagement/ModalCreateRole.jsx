import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import Form from 'react-bootstrap/Form';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { GetData, postData, putData } from "../../Service";
import { setRoleData, setRoleEdit } from "../../store/storeGlobal";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalCreateRole = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const roleEdit = useSelector((state) => state.global.roleEdit);
    const roleDetail = useSelector((state) => state.global.roleDetail);
    const Module = [
        {
            module: "Dashboard",
            description: "Dashboard displays whether invoice data is OK or not",
        },
        {
            module: "Data Invoice",
            description: "Invoice Data displays Invoice Data and also Inoive Creation etc",
        },
        {
            module: "User Management",
            description: "User Data displays User Data and also User Creation etc",
        },
    ]
    const [mainState, setMainState] = useState({
        role: '',
        description: '',
        module: [],
    })

    const editField = ({ event, setMainState, name }) => {
        if (name === 'checkbox') {
            const newState = { ...mainState };
            const isEventExist = newState.module.some(data => data.module === event.module);
            if (isEventExist) {
                newState.module = newState.module.filter(data => data.module !== event.module);
            } else {
                newState.module.push(event);
            }
            setMainState(newState);
        } else {
            const { name, value } = event.target;
            setMainState(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    useEffect(() => {
        if (roleDetail) {
            const newState = { ...mainState }
            newState.role = roleDetail.data.role
            newState.description = roleDetail.data.description
            roleDetail.data.RoleModules.forEach(data => {
                const dataModule = {
                    module: data.module,
                    description: data.description,
                }
                newState.module.push(dataModule)
            })
            setMainState(newState);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    const handleClose = () => {
        setMainState({
            role: '',
            description: '',
            module: [],
        })
        setIsOpen(false)
    }

    const submitInvoice = async (e) => {
        if (roleDetail) {
            await putData({
                dispatch,
                setData: setRoleEdit,
                urlApi: 'role',
                payload: mainState,
                param: roleEdit
            })
        } else {
            await postData({
                urlApi: 'role',
                payload: mainState,
            })
        }
        await GetData({ dispatch, setData: setRoleData, urlApi: 'role' })
        setMainState({
            role: '',
            description: '',
            module: [],
        })
        setIsOpen(false)
        e.preventDefault();
    };

    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <div className="modal-create-user">
                <div
                    className="d-flex justify-content-end"
                    onClick={handleClose}
                >
                    <i className="ri-close-line" />
                </div>

                <div className="row w-100">
                    <div className="col-6">
                        <div>
                            <span className="from-title">Role</span>
                            <Form.Control
                                className="form-control-invoice my-2"
                                placeholder={"Role"}
                                value={mainState.role}
                                type="text"
                                name="role"
                                onChange={(event) => editField({ event, setMainState })}
                                autoComplete="role"
                                required
                            />
                        </div>
                        <div>
                            <span className="from-title">Description</span>
                            <Form.Control
                                className="form-control-invoice my-2"
                                placeholder={"Description"}
                                value={mainState.description}
                                type="text"
                                name="description"
                                onChange={(event) => editField({ event, setMainState })}
                                autoComplete="description"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-6">
                        <span className="from-title">Select Module</span>
                        <div className="switch-module">
                            {Module.map((data, idx) => {
                                return (
                                    <div className="switch-item" key={`${data.module}-${idx}`}>
                                        <div>{data.module}</div>
                                        <input
                                            type="checkbox"
                                            id={`${data.module}-${idx}`}
                                            checked={mainState.module.some(existingEvent => existingEvent.module === data.module)}
                                            name="checkbox"
                                            onClick={() => editField({ event: data, setMainState, name: 'checkbox' })}
                                        />
                                        <label for={`${data.module}-${idx}`}>Toggle</label>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="footer-btn">
                    <button
                        className="btn btn-cancel"
                        onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn btn-submit me-2" onClick={(e) => submitInvoice(e)}>Submit</button>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalCreateRole;
