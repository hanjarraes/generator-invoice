import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import Modal from 'react-bootstrap/Modal';
import { BiPaperPlane, BiCloudDownload } from "react-icons/bi";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
// import Logo from '../logo-Alurnews-02.png'

const GenerateInvoice = () => {
  html2canvas(document.querySelector("#invoiceCapture")).then((canvas) => {
    const imgData = canvas.toDataURL('image/png', 1.0);
    const pdf = new jsPDF({
      orientation: 'portrait',
      unit: 'pt',
      format: [612, 792]
    });
    pdf.internal.scaleFactor = 1;
    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
    pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
    pdf.save('invoice-001.pdf');
  });
}

const InvoiceModal = ({ showModal, closeModal, info, currency, total, items, subTotal, taxAmmount, discountAmmount, isSignature }) => {
  return (
    <div>
      <Modal show={showModal} onHide={closeModal} size="lg" centered>
        <div id="invoiceCapture">
          <div className="bg-light w-100 p-4 d-flex justify-content-between">
            <div>
              {/* <img src={Logo} alt='logo' style={{ width: 300 }} /> */}
              <div className='header-modal'>
                <span>Mega Legenda 2-D2-01, Batam Kota,Batam,Kepri</span>
                <span>Email: alurnews01@gmail.com - Hp: 081375016588</span>
              </div>
            </div>
            <div>
              Invoice #: {info.invoiceNumber || ''}
            </div>
          </div>
          <div className="p-4">
            <Row className="mb-4">
              <Col md={4}>
                <div className="fw-bold">Billed to:</div>
                <div>{info.billTo || ''}</div>
                <div>{info.billToAddress || ''}</div>
                <div>{info.billToEmail || ''}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold">Billed From:</div>
                <div>{info.billFrom || ''}</div>
                <div>{info.billFromAddress || ''}</div>
                <div>{info.billFromEmail || ''}</div>
              </Col>
              <Col md={4}>
                <div className="fw-bold mt-2">Date Of Issue:</div>
                <div>{info.dateOfIssue || ''}</div>
              </Col>
            </Row>
            <Table className="mb-0">
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
                      <td className="text-end" style={{ width: '100px' }}>{currency} {parseFloat(item.price).toLocaleString()}</td>
                      <td className="text-end" style={{ width: '100px' }}>{currency} {parseFloat(item.price * item.quantity).toLocaleString()}</td>
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
                  <div className='item-total'>{currency} {parseFloat(subTotal).toLocaleString()}</div>
                </div>
                {taxAmmount !== '0.00' &&
                  <div className='modal-text-item'>
                    <span>TAX</span>
                    <div className='item-total'>{currency} {parseFloat(taxAmmount).toLocaleString()}</div>
                  </div>
                }
                {discountAmmount !== '0.00' &&
                  <div className='modal-text-item'>
                    <span>DISCOUNT</span>
                    <div className='item-total'>{currency} {parseFloat(discountAmmount).toLocaleString()}</div>
                  </div>
                }

                <div className='modal-text-item'>
                  <span>TOTAL</span>
                  <div>{currency} {total}</div>
                </div>

              </Col>
            </Row>
            {info.notes &&
              <div className="bg-light py-3 px-4 rounded">
                {info.notes}
              </div>}

            {isSignature === true &&
              <Row className='mt-4'>
                <Col md={8} />
                <Col md={4} className='modal-signature'>
                  <div>Thanks You & Regards, </div>
                  <span>AlurNews.com</span>
                  <div style={{ marginTop: '100px' }}>Harianto</div>
                  <div>Direktur</div>
                </Col>
              </Row>
            }

          </div>
        </div>
        <div className="pb-4 px-4">
          <Row>
            <Col md={6}>
              <Button variant="primary" className="d-block w-100" onClick={GenerateInvoice}>
                <BiPaperPlane style={{ width: '15px', height: '15px', marginTop: '-3px' }} className="me-2" />Send Invoice
              </Button>
            </Col>
            <Col md={6}>
              <Button variant="outline-primary" className="d-block w-100 mt-3 mt-md-0" onClick={GenerateInvoice}>
                <BiCloudDownload style={{ width: '16px', height: '16px', marginTop: '-3px' }} className="me-2" />
                Download Copy
              </Button>
            </Col>
          </Row>
        </div>
      </Modal>
      <hr className="mt-4 mb-3" />
    </div>
  );
}

export default InvoiceModal;
