import React, { useState, useEffect } from "react";
import Dialog from '@mui/material/Dialog';
import Form from 'react-bootstrap/Form';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { GetData, postData, putData } from "../../Service";
import { setUserData, setUserEdit } from "../../store/storeGlobal";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalCreate = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const userEdit = useSelector((state) => state.global.userEdit);
    const userDetail = useSelector((state) => state.global.userDetail);
    const [roleItem, setRoleItem] = useState([])
    const [mainState, setMainState] = useState({
        email: '',
        name: '',
        username: '',
        password: '',
        user_role_id: 1,
        role: 'Admin',
    })
    const roleData = useSelector((state) => state.global.roleData);


    const editField = ({ event, setMainState, }) => {
        const { name, value } = event.target;
        setMainState(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onRoleChange = ({ event, setMainState }) => {
        const selectedRoleItem = JSON.parse(event.target.value);

        setMainState(prevState => ({
            ...prevState,
            user_role_id: selectedRoleItem.id,
            role: selectedRoleItem.role
        }));
    };

    const submitInvoice = async (e) => {
        if (userDetail) {
            await putData({
                dispatch,
                setData: setUserEdit,
                urlApi: 'user',
                payload: mainState,
                param: userEdit
            })
        } else {
            await postData({
                urlApi: 'user',
                payload: mainState,
                dispatch,
                setData: setUserData,
            })

        }
        await GetData({ dispatch, setData: setUserData, urlApi: 'user' })
        setMainState({
            email: '',
            name: '',
            username: '',
            password: '',
            user_role_id: 1,
            role: 'Admin',
        })
        setIsOpen(false)
        e.preventDefault();
    };

    useEffect(() => {
        if (userDetail) {
            const dataDetail = userDetail.data.allInfo
            const newData = { ...mainState }
            newData.email = dataDetail.email
            newData.name = dataDetail.name
            newData.username = dataDetail.username
            newData.password = dataDetail.password
            newData.user_role_id = dataDetail.user_role_id
            newData.role = dataDetail.UserRole.role
            setMainState(newData)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleClose = () => {
        setMainState({
            email: '',
            name: '',
            username: '',
            password: '',
            user_role_id: 1,
            role: 'Admin',
        })
        setIsOpen(false)
    }


    useEffect(() => {
        if (roleData?.data) {
            if (userDetail) {
                const defultRoleSelect = mainState.role;
                const roleDataArray = roleData?.data;

                const defaultRoleIndex = roleDataArray.findIndex(
                    data => data.role === defultRoleSelect
                );
                if (defaultRoleIndex !== -1) {
                    const sortedRoleArray = [
                        roleDataArray[defaultRoleIndex],
                        ...roleDataArray.slice(0, defaultRoleIndex),
                        ...roleDataArray.slice(defaultRoleIndex + 1)
                    ];
                    setRoleItem(sortedRoleArray);
                } else {
                    setRoleItem(roleDataArray);
                }

            } else {
                setRoleItem(roleData?.data);
            }
        }
    }, [mainState.role, roleData?.data, userDetail]);

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
                            <span className="from-title">Name</span>
                            <Form.Control
                                className="form-control-invoice my-2"
                                placeholder={"Name"}
                                value={mainState.name}
                                type="text"
                                name="name"
                                onChange={(event) => editField({ event, setMainState })}
                                autoComplete="name"
                                required
                            />
                        </div>
                        <div>
                            <span className="from-title">Email Address</span>
                            <Form.Control
                                className="form-control-invoice my-2"
                                placeholder={"Email Address"}
                                value={mainState.email}
                                type="email"
                                name="email"
                                onChange={(event) => editField({ event, setMainState })}
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div>
                            <span className="from-title">Select Role</span>

                            <Form.Group className="mb-3">
                                <Form.Select
                                    onChange={event => onRoleChange({ event, setMainState })}
                                    className="btn btn-light my-1"
                                    aria-label="Change Role"
                                >
                                    {roleItem.map((data, idx) => {
                                        const newDataString = JSON.stringify({
                                            id: data.id,
                                            role: data.role
                                        });
                                        return (
                                            <option
                                                key={`role-${data.role}-${idx}`}
                                                value={newDataString}
                                            >
                                                {data.role}
                                            </option>
                                        );
                                    })}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                    <div className="col-6">
                        <div>
                            <span className="from-title">Username</span>
                            <Form.Control
                                className="form-control-invoice my-2"
                                placeholder={"Username"}
                                rows={3}
                                value={mainState.username}
                                type="username"
                                name="username"
                                onChange={(event) => editField({ event, setMainState })}
                                autoComplete="username"
                                required
                            />
                        </div>
                        <div>
                            <span className="from-title">Password</span>
                            <Form.Control
                                className="form-control-invoice my-2"
                                placeholder={"Password"}
                                rows={3}
                                value={mainState.password}
                                type="password"
                                name="password"
                                onChange={(event) => editField({ event, setMainState })}
                                autoComplete="password"
                                required
                            />
                        </div>
                    </div>
                </div>
                <div className="footer-btn">
                    <button
                        className="btn btn-cancel"
                        onClick={handleClose}>
                        Cancel
                    </button>
                    <button className="btn btn-submit" onClick={(e) => submitInvoice(e)}>Submit</button>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalCreate;
