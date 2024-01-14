import React from "react";
import InvoiceForm from "../../components/InvoiceForm";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const CreateInvoice = () => {
    const navigate = useNavigate()
    const invoiceDetail = useSelector((state) => state.global.invoiceDetail);

    return (
        <div className="container">
            <div className="back-btn">
                <span onClick={() => navigate('/data-invoice')}>Go Back</span>
            </div>
            <InvoiceForm invoiceDetail={invoiceDetail} />
        </div>
    );
};

export default CreateInvoice;
