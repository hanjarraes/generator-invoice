import React from "react";
import InvoiceForm from "../../components/InvoiceForm";
import { useNavigate } from "react-router-dom";
import "./style.scss";

const CreateInvoice = () => {
    const navigate = useNavigate()
    return (
        <div className="container">
            <div className="back-btn">
                <button className="btn" onClick={() => navigate('/data-invoice')}>Go Back</button>
            </div>
            <InvoiceForm />
        </div>
    );
};

export default CreateInvoice;
