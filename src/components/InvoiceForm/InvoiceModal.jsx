import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiSolidCloudDownload } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from '../../logo-Alurnews-02.png'
import "./style.scss";
import { postData, putData } from '../../Service';
import { formatDate, formatInvoiceNumber, formatPayload, GenerateInvoice } from './service';
import { setInvoiceEdit } from '../../store/storeGlobal';

const InvoiceModal = ({
  showModal,
  closeModal,
  mainState,
  currency,
  total,
  items,
  subTotal,
  taxAmmount,
  discountAmmount,
  tableDetail,
  invoiceDetail
}) => {
  const invoiceNumber = mainState?.invoiceNumber ? formatInvoiceNumber(mainState.invoiceNumber) : mainState.invoiceNo
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const invoiceEdit = useSelector((state) => state.global.invoiceEdit);

  const submitInvoice = (e) => {
    const payload = formatPayload({ mainState, items })
    if (invoiceDetail) {
      putData({
        dispatch,
        setData: setInvoiceEdit,
        urlApi: 'invoice',
        payload,
        param: invoiceEdit
      })
    } else {
      postData({
        urlApi: 'invoice',
        payload
      })
    }
    closeModal()
    navigate('/data-invoice')
    e.preventDefault();
  };

  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <div id="invoiceCapture">
          <div className="bg-light w-100 p-4 d-flex justify-content-between">
            <div>
              <img src={Logo} alt='logo' style={{ width: 300 }} />
              <div className='header-modal'>
                <span>Mega Legenda 2-D2-01, Batam Kota,Batam,Kepri</span>
                <span>Email: alurnews01@gmail.com - Hp: 081375016588</span>
              </div>
            </div>
            <div>
              Invoice #: {invoiceNumber}
            </div>
          </div>
          <div className="p-4">
            <Row className="mb-4">
              <Col md={4}>
                <div className="fw-bold">Billed to:</div>
                <div>{mainState.billTo || ''}</div>
                <div>{mainState.billToAddress || ''}</div>
                <div>{mainState.billToEmail || ''}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold">Billed From:</div>
                <div>{mainState.billFrom || ''}</div>
                <div>{mainState.billFromAddress || ''}</div>
                <div>{mainState.billFromEmail || ''}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold mt-2">Date Of Issue:</div>
                <div>{formatDate(mainState.dateOfIssue) || ''}</div>
              </Col>
            </Row>
            <Table className="mb-0 table-invoice">
              <thead>
                <tr>
                  <th>QTY</th>
                  <th>DESCRIPTION</th>
                  <th className="text-end">PRICE</th>
                  <th className="text-end">AMOUNT</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, i) => {
                  return (
                    <tr id={i} key={i}>
                      <td style={{ width: '70px' }}>
                        {item.quantity}
                      </td>
                      <td>
                        {item.name} - {item.description}
                      </td>
                      <td className="text-end" style={{ width: '150px' }}>{currency} {parseFloat(item.price).toLocaleString()}</td>
                      <td className="text-end" style={{ width: '150px' }}>{currency} {parseFloat(item.price * item.quantity).toLocaleString()}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            <Row className='my-5'>
              <Col md={8}>
                <div className='modal-text-info'>
                  <span>Payment Intruction</span>
                  <div className='item-total'>PT. ALUR,EDIA FACRI SUKSES</div>
                </div>
                <div className='modal-text-info'>
                  <span>BANK TRANSFER</span>
                  <div className='item-total'>3262452252/Bank BCA</div>
                  <div className='item-total'>PT. ALUR,EDIA FACRI SUKSES</div>
                </div>
              </Col>
              <Col md={4}>
                <div className='modal-text-item'>
                  <span>SUBTOTAL</span>
                  <div className='item-total'>{currency} {subTotal}</div>
                </div>
                {taxAmmount !== '0.00' && taxAmmount !== '0' && taxAmmount !== '' && (
                  <div className='modal-text-item'>
                    <span>TAX</span>
                    <div className='item-total'>{currency} {taxAmmount}</div>
                  </div>
                )}
                {discountAmmount !== '0.00' && discountAmmount !== '0' && discountAmmount !== '' && (
                  <div className='modal-text-item'>
                    <span>DISCOUNT</span>
                    <div className='item-total'>{currency} {discountAmmount}</div>
                  </div>
                )}

                <div className='modal-text-item'>
                  <span>TOTAL</span>
                  <div>{currency} {total}</div>
                </div>

              </Col>
            </Row>
            {mainState.notes &&
              <div className="bg-light py-3 px-4 rounded">
                {mainState.notes}
              </div>}

            <Row className='mt-4'>
              <Col md={8} />
              <Col md={4} className='modal-signature'>
                <div>Thanks You & Regards, </div>
                <span>AlurNews.com</span>
                <div style={{ marginTop: '100px' }}>Harianto</div>
                <div>Direktur</div>
              </Col>
            </Row>

          </div>
        </div>
        <div className="pb-4 px-4">
          <Row>
            {tableDetail ? mainState.status === 'Ok' ?
              (
                <>
                  <Col md={6}>
                    <Button variant="secondary" className="d-block w-100" onClick={closeModal} onKeyDown={closeModal} onKeyUp={closeModal}>
                      <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Close
                    </Button>
                  </Col>
                  <Col md={6}>
                    <Button variant="primary" className="d-block w-100" onClick={() => GenerateInvoice(mainState)}>
                      <BiSolidCloudDownload style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Download
                    </Button>
                  </Col>
                </>
              )
              :
              (
                <>
                  <Col md={6}>
                    <Button variant="primary" className="d-block w-100" onClick={closeModal} onKeyDown={closeModal} onKeyUp={closeModal}>
                      <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Close
                    </Button>
                  </Col>
                </>
              )
              :
              <>
                <Col md={6}>
                  <Button variant="secondary" className="d-block w-100" onClick={closeModal} onKeyDown={closeModal} onKeyUp={closeModal}>
                    Close
                  </Button>
                </Col>
                <Col md={6}>
                  <Button variant="primary" className="d-block w-100" onClick={(e) => submitInvoice(e)}>
                    <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Send Invoice
                  </Button>
                </Col>
              </>
            }
          </Row>
        </div>
      </Modal>
    </div>
  );
}

export default InvoiceModal;
