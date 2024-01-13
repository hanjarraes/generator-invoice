import React, { useEffect } from "react";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceData } from "../../store/storeGlobal";
import "./style.scss";
import { GetData, deleteData } from "../../Service";

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
    GetData({ dispatch, setData: setInvoiceData, urlApi:'invoice' })
  }, [dispatch]);

  const deleteItem = (invoiceId) => {
    deleteData({dispatch, setData:setInvoiceData, invoiceId, urlApi:'invoice'})
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="title-module">Data Invoice</div>
        <button className="btn btn-custom" onClick={() => navigate('/data-invoice/create')}>
          <span className="d-none d-md-block"> Create New Invoice</span>
          <i className="ri-add-line mx-1 d-block d-md-none" />
        </button>
      </div>
      <Table columns={columns} data={invoiceData.data} deleteItem={deleteItem} />
    </>
  );
};

export default Invoice;
