import React from "react";
import Table from "../../components/Table";
import { useNavigate } from "react-router-dom";
import { dataDummy } from "../../dummyData";
import "./style.scss";

const Invoice = () => {
  const navigate = useNavigate()

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

  return (
    <>
      <div className="d-flex justify-content-between align-items-center">
        <div className="title-module">Data Invoice</div>
        <button className="btn btn-custom" onClick={() => navigate('/data-invoice/create')}>
          <span className="d-none d-md-block"> Create New Invoice</span>
          <i className="ri-add-line mx-1 d-block d-md-none" />
        </button>
      </div>
      <Table columns={columns} data={dataDummy} />
    </>
  );
};

export default Invoice;