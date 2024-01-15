import React, { useEffect, useState, useMemo } from "react";
import Table from "../../components/Table";
import { useDispatch, useSelector } from "react-redux";
import { setRoleData, setUserData } from "../../store/storeGlobal";
import "./style.scss";
import { GetData, deleteData } from "../../Service";
import ModalCreate from "./ModalCreate";

const UserManagement = () => {
    const dispatch = useDispatch();
    const userData = useSelector((state) => state.global.userData);
    const roleData = useSelector((state) => state.global.roleData);
    const [isOpen, setIsOpen] = useState(false);

    const columnsUser = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Email",
                accessor: "email",
            },
            {
                Header: "Username",
                accessor: "username",
            },
            {
                Header: "Role",
                accessor: "role",
            },
            {
                Header: "Description",
                accessor: "description",
            }
        ],
        []
    );

    const columnsRole = useMemo(
        () => [
            {
                Header: "ID",
                accessor: "id",
            },
            {
                Header: "Role",
                accessor: "role",
            },
            {
                Header: "Description",
                accessor: "description",
            },
        ],
        []
    );

    useEffect(() => {
        GetData({ dispatch, setData: setUserData, urlApi: 'user' })
        GetData({ dispatch, setData: setRoleData, urlApi: 'role' })
    }, [dispatch]);


    const deleteItemUser = (Id) => {
        deleteData({
            dispatch,
            setData: setUserData,
            Id,
            urlApi: 'user'
        })
    }

    const deleteItemRole = (Id) => {
        deleteData({
            dispatch,
            setData: setRoleData,
            Id,
            urlApi: 'role'
        })
    }

    const showEdit = async () => {
        setIsOpen(false)
    }

    const showCreate = async () => {
        setIsOpen(true)
    }

    return (
        <>
            <div className="d-flex justify-content-end align-items-center">
                <button className="btn btn-custom me-3" onClick={() => showCreate()}>
                    <span className="d-none d-md-block"> Create New User</span>
                    <i className="ri-add-line mx-1 d-block d-md-none" />
                </button>
                {/* <button className="btn btn-custom" onClick={() => showCreate()}>
                    <span className="d-none d-md-block"> Create New Role</span>
                    <i className="ri-add-line mx-1 d-block d-md-none" />
                </button> */}
            </div>
            <div className="row">
                <div className="col-12 col-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="title-module">Data User</div>
                    </div>
                    <ModalCreate
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                    <Table
                        showEdit={showEdit}
                        columns={columnsUser}
                        data={userData?.data}
                        deleteItem={deleteItemUser}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="title-module">Data Role</div>
                    </div>
                    <ModalCreate
                        isOpen={isOpen}
                        setIsOpen={setIsOpen}
                    />
                    <Table
                        showEdit={showEdit}
                        columns={columnsRole}
                        data={roleData?.data}
                        deleteItem={deleteItemRole}
                    />
                </div>
            </div>

        </>
    );
};

export default UserManagement;
