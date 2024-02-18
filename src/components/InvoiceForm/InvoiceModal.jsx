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
import Signature from '../../assets/img/Logo/signature.png'
import "./style.scss";
import { GetData, postData, putData } from '../../Service';
import { formatDate, formatInvoiceNumber, formatPayload, GenerateInvoice } from './service';
import { setInvoiceData, setInvoiceEdit } from '../../store/storeGlobal';

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
  const [withSignature, setwithSignature] = React.useState(false)
  const user = useSelector((state) => state.login.user);
  const dataUser = user?.data

  const submitInvoice = async (e) => {
    const payload = formatPayload({ mainState, items })
    if (invoiceDetail) {
      await putData({
        dispatch,
        setData: setInvoiceEdit,
        urlApi: 'invoice',
        payload,
        param: invoiceEdit
      })
    } else {
      await postData({
        urlApi: 'invoice',
        payload
      })
    }
    await GetData({ dispatch, setData: setInvoiceData, urlApi: 'invoice' })
    closeModal()
    navigate('/data-invoice')
    e.preventDefault();
  };

  const okInvoice = async (e) => {
    const payload = formatPayload({ mainState, items })
    payload.status = "Ok"
    payload.allInfo.status = "Ok"
    payload.allInfo.invoice_status_id = 1
    payload.allInfo.invoiceNo = invoiceNumber
    payload.invoice_no = invoiceNumber
    await putData({
      dispatch,
      setData: setInvoiceEdit,
      urlApi: 'invoice',
      payload,
      param: invoiceEdit
    })
    await GetData({ dispatch, setData: setInvoiceData, urlApi: 'invoice' })
    closeModal()
    e.preventDefault();
  };

  const isAdmin = dataUser.role === 'Super Admin' || dataUser.role === 'Admin';

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
                <div>{mainState.billToEmail || ''}</div>
                <div>{mainState.billToAddress || ''}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold">Billed From:</div>
                <div>{mainState.billFrom || ''}</div>
                <div>{mainState.billFromEmail || ''}</div>
                <div>{mainState.billFromAddress || ''}</div>
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
                {mainState.status === 'Ok' && withSignature ? <img src={Signature} alt='signature' className='img-signarute' /> : ''}
                <div style={{ marginTop: '100px' }}>Harianto</div>
                <div>Direktur</div>
              </Col>
            </Row>

          </div>
        </div>
        <div className="pb-4 px-4">
          {tableDetail ? mainState.status === 'Ok' ? (
            <div className='row'>
              <div className='col-6'>
                <div className="switch-item">
                  <div>With Signature and Stampel</div>
                  <input
                    type="checkbox"
                    id={`signature-yes`}
                    checked={withSignature}
                    name="checkbox"
                    onClick={() => setwithSignature(!withSignature)}
                  />
                  <label for={`signature-yes`}>Toggle</label>
                </div>
              </div>
            </div>
          ) : '' : ''}
          < Row >
            {
              tableDetail ? mainState.status === 'Ok' ?
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
                      <Button variant="secondary" className="d-block w-100" onClick={closeModal} onKeyDown={closeModal} onKeyUp={closeModal}>
                        Close
                      </Button>
                    </Col>
                    {isAdmin && (
                      <Col md={6}>
                        <Button variant="primary" className="d-block w-100" onClick={(e) => okInvoice(e)}>
                          <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Ok Invoice
                        </Button>
                      </Col>
                    )}
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
      </Modal >
    </div >
  );
}

export default InvoiceModal;
