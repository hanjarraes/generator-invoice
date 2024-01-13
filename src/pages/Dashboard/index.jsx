import React, { useState, useEffect } from "react";
import InvoiceModal from "../../components/InvoiceForm/InvoiceModal";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceData } from "../../store/storeGlobal";
import "./style.scss";
import { GetData } from "../../Service";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState();
  const invoiceData = useSelector((state) => state.global.invoiceData);
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => {
    setIsOpen(false)
  }
  const openModal = (items) => {
    setShowDetail(items)
    setIsOpen(true)
  }

  useEffect(() => {
    GetData({ dispatch, setData: setInvoiceData })
  }, [dispatch]);


  return (
    <div className="container">
      <div className="d-flex flex-wrap justify-content-around">
        {invoiceData?.data.map((item, idx) => {
          return (
            <div className="card-status" key={item.invoice_no + idx} onClick={() => openModal(item.allInfo)}>
              <div className={`title-${item.status}`}>
                {item.status}
              </div>
              <div style={{ padding: '0px 10px', width: '180px' }}>
                <div>{item.invoice_no}</div>
                <div>{item.billFrom}</div>
                <div>{item.allInfo.currency + '. ' + item.total}</div>
              </div>
            </div>
          )
        })}
      </div>
      {showDetail &&
        <InvoiceModal
          tableDetail
          showModal={isOpen}
          closeModal={closeModal}
          info={showDetail}
          items={showDetail.items}
          currency={showDetail.currency}
          subTotal={showDetail.subTotal}
          taxAmmount={showDetail.taxAmount}
          discountAmmount={showDetail.discountAmount}
          total={showDetail.total} />
      }
    </div>
  );
};

export default Dashboard;
