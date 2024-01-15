import React, { useState } from "react";
import Dialog from '@mui/material/Dialog';
import Form from 'react-bootstrap/Form';
import Slide from '@mui/material/Slide';
import { useSelector, useDispatch } from "react-redux";
import "./style.scss";
import { GetData, postData } from "../../Service";
import { setUserData } from "../../store/storeGlobal";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const ModalCreate = ({ isOpen, setIsOpen }) => {
    const dispatch = useDispatch()
    const [mainState, setMainState] = useState({
        email: '',
        username: '',
        password: '',
        user_role_id: 1,
        role: 'Admin',
    })

    const roleData = useSelector((state) => state.global.roleData);
    const selectedRole = mainState.role;
    const matchingRole = roleData.data.filter(data => data.role === selectedRole);
    const nonMatchingRole = roleData.data.filter(data => data.role !== selectedRole);
    const finalDataCurrency = matchingRole.concat(nonMatchingRole);

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
        await postData({
            urlApi: 'user',
            payload: mainState
        })
        await GetData({ dispatch, setData: setUserData, urlApi: 'user' })

        setIsOpen(false)
        e.preventDefault();
    };


    return (
        <Dialog
            open={isOpen}
            TransitionComponent={Transition}
            keepMounted
            onClose={() => setIsOpen(false)}
            aria-describedby="alert-dialog-slide-description"
        >
            <div className="modal-create-user">
                <div className="d-flex justify-content-end" onClick={() => setIsOpen(false)}>
                    <i className="ri-close-line" />
                </div>

                <div className="row w-100">
                    <div className="col-6">
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
                    </div>
                    <div className="col-6">
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

                        <div>
                            <span className="from-title">Select Role</span>

                            <Form.Group className="mb-3">
                                <Form.Select
                                    onChange={event => onRoleChange({ event, setMainState })}
                                    className="btn btn-light my-1"
                                    aria-label="Change Role"
                                >
                                    {finalDataCurrency.map((data, idx) => {
                                        const newDataString = JSON.stringify({
                                            id: data.id,
                                            role: data.role
                                        });
                                        // if (invoiceDetail) {
                                        //     return (
                                        //         <option
                                        //             key={`currency-${data.currency}-${idx}`}
                                        //             value={newDataString}
                                        //         >
                                        //             {data.currency} ({data.description})
                                        //         </option>
                                        //     );
                                        // } else {
                                        return (
                                            <option
                                                key={`currency-${data.currency}-${idx}`}
                                                value={newDataString}
                                            >
                                                {data.role}
                                            </option>
                                        );
                                        // }

                                    })}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                </div>
                <div className="footer-btn">
                    <button className="btn btn-cancel" onClick={() => setIsOpen(false)}>Cancel</button>
                    <button className="btn btn-submit" onClick={(e) => submitInvoice(e)}>Submit</button>
                </div>
            </div>
        </Dialog>
    );
};

export default ModalCreate;
