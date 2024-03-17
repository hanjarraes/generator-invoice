import React, { useState, useEffect } from "react";
import InvoiceModal from "../../components/InvoiceForm/InvoiceModal";
import { useDispatch, useSelector } from "react-redux";
import { setInvoiceData, setInvoiceEdit } from "../../store/storeGlobal";
import "./style.scss";
import { GetData } from "../../Service";

const Dashboard = () => {
  const dispatch = useDispatch();
  const [showDetail, setShowDetail] = useState();
  const invoiceData = useSelector((state) => state.global.invoiceData);
  const [isOpen, setIsOpen] = useState(false);
  const [DataOk, setDataOk] = useState();
  const [DataWait, setDataWait] = useState();
  const [DataRejected, setDataRejected] = useState();
  const closeModal = () => {
    setIsOpen(false)
  }
  const openModal = async (items, id) => {
    await dispatch(setInvoiceEdit(id));
    setShowDetail(items)
    setIsOpen(true)
  }

  useEffect(() => {
    GetData({ dispatch, setData: setInvoiceData, urlApi: 'invoice' })
  }, [dispatch]);

  useEffect(() => {
    const ItemOk = []
    const ItemWait = []
    const ItemRejected = []
    invoiceData?.data.forEach(item => {
      if (item.status === 'Ok') ItemOk.push(item)
      if (item.status === 'Waiting') ItemWait.push(item)
      if (item.status === 'Rejected') ItemRejected.push(item)

    })
    setDataOk(ItemOk)
    setDataWait(ItemWait)
    setDataRejected(ItemRejected)
  }, [invoiceData?.data])

  return (
    <div className="container">
      <div className="d-flex justify-content-around">
        <div className="dashboard-card">
          <div className="card-title">
            Status OK
            <span>{DataOk?.length}</span>
          </div>
          <div className="card-content">
            {DataOk?.map((item, idx) => {
              return (
                <div className="card-status" key={item.invoice_no + idx} onClick={() => openModal(item.allInfo, item.id)}>
                  <div className={`title-${item.status}`}>
                    {item.status}
                  </div>
                  <div style={{ padding: '0px 10px', width: '180px' }}>
                    <div>{item.invoice_no}</div>
                    <div>{item.billTo}</div>
                    <div>{item.allInfo.currency + '. ' + item.total}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="dashboard-card">
        <div className="card-title">
            Status Waiting
            <span>{DataWait?.length}</span>
          </div>
          <div className="card-content">
            {DataWait?.map((item, idx) => {
              return (
                <div className="card-status" key={item.invoice_no + idx} onClick={() => openModal(item.allInfo, item.id)}>
                  <div className={`title-${item.status}`}>
                    {item.status}
                  </div>
                  <div style={{ padding: '0px 10px', width: '180px' }}>
                    <div>{item.invoice_no}</div>
                    <div>{item.billTo}</div>
                    <div>{item.allInfo.currency + '. ' + item.total}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="dashboard-card">
        <div className="card-title">
            Status Rejected
            <span>{DataRejected?.length}</span>
          </div>
          <div className="card-content">
            {DataRejected?.map((item, idx) => {
              return (
                <div className="card-status" key={item.invoice_no + idx} onClick={() => openModal(item.allInfo, item.id)}>
                  <div className={`title-${item.status}`}>
                    {item.status}
                  </div>
                  <div style={{ padding: '0px 10px', width: '180px' }}>
                    <div>{item.invoice_no}</div>
                    <div>{item.billTo}</div>
                    <div>{item.allInfo.currency + '. ' + item.total}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      {showDetail &&
        <InvoiceModal
          showInvoice
          tableDetail
          showModal={isOpen}
          closeModal={closeModal}
          mainState={showDetail}
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
