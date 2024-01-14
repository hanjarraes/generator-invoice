import React, { useEffect } from "react";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceData, setInvoiceDetail, setInvoiceEdit } from "../../store/storeGlobal";
import "./style.scss";
import { GetData, GetShowData, deleteData } from "../../Service";

const Invoice = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const invoiceData = useSelector((state) => state.global.invoiceData);

  const columns = React.useMemo(
    () => [
      {
        Header: "Invoice Number",
        accessor: "invoice_no",
      },
      {
        Header: "Bill From",
        accessor: "billFrom",
      },
      {
        Header: "Email",
        accessor: "billFromEmail",
      },
      {
        Header: "Address",
        accessor: "billFromAddress",
      },
      {
        Header: "Status",
        accessor: "status",
      },
      {
        Header: "Current Date",
        accessor: "current_date",
      },
      {
        Header: "Due Date",
        accessor: "due_date",
      },
      {
        Header: "Total",
        accessor: "total",
      },
    ],
    []
  );

  useEffect(() => {
    GetData({ dispatch, setData: setInvoiceData, urlApi: 'invoice' })
  }, [dispatch]);

  const deleteItem = (invoiceId) => {
    deleteData({ dispatch, setData: setInvoiceData, invoiceId, urlApi: 'invoice' })
  }

  const showEdit = async (value) => {
    await dispatch(setInvoiceEdit(value));
    await GetShowData({
      dispatch,
      setData: setInvoiceDetail,
      urlApi: 'invoice',
      param: value
    })
    navigate('/data-invoice/create')
  }

  const showCreate = async () => {
    await dispatch(setInvoiceEdit(null));
    await dispatch(setInvoiceDetail(null));
    navigate('/data-invoice/create')
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="title-module">Data Invoice</div>
        <button className="btn btn-custom" onClick={() => showCreate()}>
          <span className="d-none d-md-block"> Create New Invoice</span>
          <i className="ri-add-line mx-1 d-block d-md-none" />
        </button>
      </div>
      <Table
        showEdit={showEdit}
        columns={columns}
        data={invoiceData.data}
        deleteItem={deleteItem}
      />
    </>
  );
};

export default Invoice;
