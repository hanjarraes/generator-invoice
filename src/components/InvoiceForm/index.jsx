/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';
import { useDispatch, useSelector } from "react-redux";
import "./style.scss";
import { GetData } from '../../Service';
import { setCurrency } from '../../store/storeGlobal';
import {
  handleAddEvent,
  handleRowDel,
  handleCalculateTotal,
  onCurrencyChange,
  editField,
  onItemizedItemEdit,
  formatDateForm,
  formatDateDefult
} from './service';

const InvoiceForm = ({ invoiceDetail }) => {
  const dispatch = useDispatch();
  const currencyData = useSelector((state) => state.global.currencyData);
  const user = useSelector((state) => state.login.user);
  const [currencyItem, setCurrencyItem] = useState([])
  const [mainState, setMainState] = useState({
    isOpen: false,
    invoice_currency_id: 1,
    currency: 'Rp',
    currentDate: new Date().toISOString().slice(0, 10),
    invoiceNumber: 1,
    dateOfIssue: new Date().toISOString().slice(0, 10),
    nameBank: '',
    idBank: '',
    invoice_status_id: 2,
    status: 'Waiting',
    billTo: '',
    billToEmail: '',
    billToAddress: '',
    billFrom: user.data.name,
    billFromEmail: user.data.email,
    billFromAddress: 'Mega Legenda 2-D2-01.Batam Kota Kepri',
    notes: 'Thanks for your business!',
    total: '0',
    subTotal: '0',
    taxRate: '',
    taxAmount: '0',
    discountRate: '',
    discountAmount: '0'
  });

  const [items, setItems] = useState([
    {
      id: 1,
      name: '',
      description: '',
      price: '1',
      quantity: 1
    }
  ]);

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal({ mainState, setMainState, items });
    setMainState(prevState => ({
      ...prevState,
      isOpen: true
    }));
  };

  const closeModal = () => setMainState(prevState => ({
    ...prevState,
    isOpen: false
  }));

  useEffect(() => {
    GetData({ dispatch, setData: setCurrency, urlApi: 'currency' })
  }, [dispatch]);

  useEffect( () => {
    if (invoiceDetail) {
      const dataDetail = invoiceDetail.data.allInfo
      const dataItem = invoiceDetail.data.allInfo.items
      const newData = { ...mainState }

      const invoiceNumberPart = dataDetail.invoiceNo.split('/')[0];
      const newInvoiceNumber = parseInt(invoiceNumberPart, 10);

      newData.invoice_currency_id = dataDetail.invoice_currency_id
      newData.currency = dataDetail.currency
      newData.currentDate = dataDetail.currentDate
      newData.invoiceNumber = newInvoiceNumber
      newData.dateOfIssue = dataDetail.dateOfIssue
      newData.invoice_status_id = dataDetail.invoice_status_id
      newData.status = dataDetail.status
      newData.billTo = dataDetail.billTo
      newData.billToEmail = dataDetail.billToEmail
      newData.billToAddress = dataDetail.billToAddress
      newData.billFrom = dataDetail.billFrom
      newData.billFromEmail = dataDetail.billFromEmail
      newData.billFromAddress = dataDetail.billFromAddress
      newData.notes = dataDetail.notes
      newData.total = dataDetail.total
      newData.subTotal = dataDetail.subTotal
      newData.taxRate = dataDetail.taxRate
      newData.taxAmount = dataDetail.taxAmount
      newData.discountRate = dataDetail.discountRate
      newData.discountAmount = dataDetail.discountAmount
      setMainState(newData)

      const newItem = []
      dataItem?.forEach((data, idx) => {
        const dataItem = {
          id: idx + 1,
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity
        }
        newItem.push(dataItem)
      })

      setItems(newItem)
    }

  }, []);

  useEffect(() => {
    if (currencyData?.data) {
      if (invoiceDetail) {
        if (mainState.currency) {
          const defultCurrencySelect = mainState.currency;
          const currencyDataArray = currencyData?.data;
          const defaultCurrencyIndex = currencyDataArray.findIndex(
            data => data.currency === defultCurrencySelect
          );
          if (defaultCurrencyIndex !== -1) {
            const sortedCurrencyArray = [
              currencyDataArray[defaultCurrencyIndex],
              ...currencyDataArray.slice(0, defaultCurrencyIndex),
              ...currencyDataArray.slice(defaultCurrencyIndex + 1)
            ];
  
            setCurrencyItem(sortedCurrencyArray);
          } else {
            setCurrencyItem(currencyDataArray);
          }
        } else {
          setCurrencyItem(currencyData?.data);
        }
      } else {
        setCurrencyItem(currencyData?.data);
      }
    }
  }, []);

  useEffect(() => {
    handleCalculateTotal({ mainState, setMainState, items });
  }, [items, mainState.taxRate, mainState.discountRate]);

  useEffect(() => {
  }, []);


  // Get dateOfIssue Detail
  const dateOfIssueData = formatDateDefult(invoiceDetail?.data.allInfo.dateOfIssue)

  return (
    <>
      <Form onSubmit={openModal}>
        <Row className='justify-content-center'>
          <Col sm={12} md={8} lg={10}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4 card-invoice">
              <Row className="mb-2">
                <Col sm={12} md={6} >
                  <Row className='align-items-center'>
                    <Col sm={12} md={6} className='mb-3'>
                      <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                      <span className="current-date">{invoiceDetail ? formatDateForm(mainState.currentDate) : new Date().toLocaleDateString()}</span>
                    </Col>
                    <Col sm={12} md={6} className="d-flex align-items-center mb-3">
                      <span className="fw-bold d-block me-2">Due&nbsp;Date:</span>
                      <Form.Control
                        className="form-control-invoice"
                        type="date"
                        defaultValue={invoiceDetail ? dateOfIssueData : new Date().toISOString().slice(0, 10)}
                        name={"dateOfIssue"}
                        onChange={(event) => editField({ event, setMainState, mainState, items })}
                        style={{ maxWidth: '150px' }}
                        required="required"
                      />
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} md={6} className="d-flex align-items-center justify-content-md-end mb-3">
                  <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                  <Form.Control
                    className="form-control-invoice"
                    type="number"
                    value={mainState.invoiceNumber}
                    name={"invoiceNumber"}
                    onChange={(event) => editField({ event, setMainState, mainState, items })} min="1" style={{ maxWidth: '70px' }}
                    required="required" />
                </Col>
              </Row>
              <div className="horizontal-line mb-4" />
              <Row className="mb-3">
                <Col>
                  <Form.Label className="fw-bold">Bill to:</Form.Label>
                  <Form.Control
                    className="form-control-invoice my-2"
                    placeholder={"Who is this invoice to?"}
                    rows={3}
                    value={mainState.billTo}
                    type="text"
                    name="billTo"
                    onChange={(event) => editField({ event, setMainState, mainState, items })}
                    autoComplete="name"
                    required
                  />
                  <Form.Control
                    className="form-control-invoice my-2"
                    placeholder={"Email address Or Description"}
                    value={mainState.billToEmail}
                    type="text"
                    name="billToEmail"
                    onChange={(event) => editField({ event, setMainState, mainState, items })}
                    autoComplete="email"
                  />
                  <Form.Control
                    className="form-control-invoice my-2"
                    placeholder={"Billing address"}
                    value={mainState.billToAddress}
                    type="text"
                    name="billToAddress"
                    autoComplete="address"
                    onChange={(event) => editField({ event, setMainState, mainState, items })}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Bill from:</Form.Label>
                  <Form.Control
                    className="form-control-invoice my-2"
                    placeholder={"Who is this invoice from?"}
                    rows={3}
                    value={mainState.billFrom}
                    type="text"
                    name="billFrom"
                    onChange={(event) => editField({ event, setMainState, mainState, items })}
                    autoComplete="name"
                    required
                  />
                  <Form.Control
                    className="form-control-invoice my-2"
                    placeholder={"Email address"}
                    value={mainState.billFromEmail}
                    type="email"
                    name="billFromEmail"
                    onChange={(event) => editField({ event, setMainState, mainState, items })}
                    autoComplete="email"
                  />
                  <Form.Control
                    className="form-control-invoice my-2"
                    placeholder={"Billing address"}
                    value={mainState.billFromAddress}
                    type="text"
                    name="billFromAddress"
                    autoComplete="address"
                    onChange={(event) => editField({ event, setMainState, mainState, items })}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <InputGroup className="my-1 flex-nowrap">
                      <Form.Control
                        className="form-control-invoice bg-white border"
                        name="taxRate"
                        type="number"
                        placeholder="Tax rate"
                        min="0"
                        step="0.01"
                        max="100"
                        value={mainState.taxRate}
                        onChange={(event) => editField({ event, setMainState, mainState, items })}
                      />
                      <InputGroup.Text className="bg-light fw-bold text-secondary small">
                        %
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <InputGroup className="my-1 flex-nowrap">
                      <Form.Control
                        className="form-control-invoice bg-white border"
                        name="discountRate"
                        type="number"
                        placeholder="Discount rate"
                        min="0"
                        step="0.01"
                        max="100"
                        value={mainState.discountRate}
                        onChange={(event) => editField({ event, setMainState, mainState, items })}
                      />
                      <InputGroup.Text className="bg-light fw-bold text-secondary small">
                        %
                      </InputGroup.Text>
                    </InputGroup>
                  </Form.Group>
                </Col>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <Form.Select
                      onChange={event => onCurrencyChange({ event, setMainState })}
                      className="btn btn-light my-1"
                      aria-label="Change Currency"
                    >
                      {currencyItem.map((data, idx) => {
                        const newDataString = JSON.stringify({
                          id: data.id,
                          currency: data.currency
                        });
                        if (invoiceDetail) {
                          return (
                            <option
                              key={`currency-${data.currency}-${idx}`}
                              value={newDataString}
                            >
                              {data.currency} ({data.description})
                            </option>
                          );
                        } else {
                          return (
                            <option
                              key={`currency-${data.currency}-${idx}`}
                              value={newDataString}
                            >
                              {data.currency} ({data.description})
                            </option>
                          );
                        }

                      })}
                    </Form.Select>
                  </Form.Group>

                </Col>
              </Row>

              <InvoiceItem
                onItemizedItemEdit={onItemizedItemEdit}
                onRowAdd={() => handleAddEvent({ items, setItems })}
                onRowDel={handleRowDel}
                currency={mainState.currency}
                items={items}
                setItems={setItems}
                mainState={mainState}
                setMainState={setMainState}
              />

              <Row className="mt-4 justify-content-end">
                <Col lg={6}>
                  <div className="d-flex flex-row align-items-start justify-content-between">
                    <span className="fw-bold">Subtotal:
                    </span>
                    <span>{mainState.currency}
                      {mainState.subTotal}</span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Discount:</span>
                    <span>
                      <span className="small ">({mainState.discountRate || 0}%)</span>
                      {mainState.currency}
                      {mainState.discountAmount || 0}</span>
                  </div>
                  <div className="d-flex flex-row align-items-start justify-content-between mt-2">
                    <span className="fw-bold">Tax:
                    </span>
                    <span>
                      <span className="small ">({mainState.taxRate || 0}%)</span>
                      {mainState.currency}
                      {mainState.taxAmount || 0}</span>
                  </div>
                  <hr />
                  <div className="d-flex flex-row align-items-start justify-content-between" style={{ fontSize: '1.125rem' }}>
                    <span className="fw-bold">Total:
                    </span>
                    <span className="fw-bold">{mainState.currency}
                      {mainState.total || 0}</span>
                  </div>
                </Col>
              </Row>
              <hr className="my-4" />
              <Form.Label className="fw-bold">Notes:</Form.Label>
              <Form.Control
                className="form-control-invoice my-2"
                style={{ height: 100 }}
                placeholder="Thanks for your business!"
                name="notes"
                value={mainState.notes}
                onChange={(event) => editField({ event, setMainState, mainState, items })}
                as="textarea"
                rows={1} />
              <div className='mt-3 d-flex align-items-center justify-content-end'>
                <Button variant="primary" type="submit">Review Invoice</Button>
              </div>
            </Card>
          </Col>
        </Row>
        <InvoiceModal
          invoiceDetail={invoiceDetail}
          showModal={mainState.isOpen}
          closeModal={closeModal}
          mainState={mainState}
          items={items}
          currency={mainState.currency}
          subTotal={mainState.subTotal}
          taxAmmount={mainState.taxAmount}
          discountAmmount={mainState.discountAmount}
          total={mainState.total} />
      </Form>
    </>
  );
};

export default InvoiceForm;
