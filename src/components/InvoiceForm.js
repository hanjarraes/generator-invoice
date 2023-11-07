/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import InvoiceItem from './InvoiceItem';
import InvoiceModal from './InvoiceModal';
import InputGroup from 'react-bootstrap/InputGroup';

const InvoiceForm = () => {
  const [mainState, setMainState] = useState({
    isOpen: false,
    currency: 'Rp',
    currentDate: new Date().toISOString().slice(0, 10),
    invoiceNumber: 1,
    dateOfIssue: '',
    nameBank: '',
    idBank: '',
    billTo: '',
    billToEmail: '',
    billToAddress: '',
    billFrom: '',
    billFromEmail: '',
    billFromAddress: '',
    notes: '',
    total: '0',
    subTotal: '0',
    taxRate: '',
    taxAmount: '0',
    discountRate: '',
    isSignature: false,
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
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
  }

  useEffect(() => {
    handleCalculateTotal();
  }, [items, mainState.taxRate, mainState.discountRate]);

  const handleRowDel = (item) => {
    const updatedItems = items.filter(i => i.id !== item.id);
    setItems(updatedItems);
  };

  const handleIsSignatureChange = () => {
    setMainState(prevState => ({
      ...prevState,
      isSignature: !prevState.isSignature
    }));
  };

  const handleAddEvent = () => {
    const id = items.length + 1;
    const newItem = {
      id: id,
      name: '',
      price: '1',
      description: '',
      quantity: 1
    };
    setItems([...items, newItem]);
  }

  const handleCalculateTotal = () => {
    const subTotalValue = items.reduce((acc, item) => {
      return acc + (parseFloat(item.price) * parseInt(item.quantity));
    }, 0);

    const subTotalFloat = parseFloat(subTotalValue);
    const taxAmountFloat = (subTotalFloat * (parseFloat(mainState.taxRate === '' ? '0.0' : mainState.taxRate) / 100));
    const discountAmountFloat = (subTotalFloat * (parseFloat(mainState.discountRate === '' ? '0.0' : mainState.discountRate) / 100));
    const totalFloat = (subTotalFloat - discountAmountFloat + parseFloat(taxAmountFloat));

    console.log(totalFloat, mainState.taxRate, mainState.discountRate, subTotalFloat)

    setMainState(prevState => ({
      ...prevState,
      subTotal: subTotalFloat.toLocaleString(),
      taxAmount: taxAmountFloat,
      discountAmount: discountAmountFloat.toLocaleString(),
      total: totalFloat.toLocaleString()
    }));
  };

  const onItemizedItemEdit = (evt) => {
    const { id, name, value } = evt.target;
    const newItems = items.map(item => {
      if (item.id === parseInt(id)) {
        return {
          ...item,
          [name]: value
        };
      }
      return item;
    });
    setItems(newItems);
    handleCalculateTotal();
  };

  const editField = (event) => {
    const { name, value } = event.target;
    setMainState(prevState => ({
      ...prevState,
      [name]: value
    }));
    handleCalculateTotal();
  };

  const onCurrencyChange = (event) => {
    setMainState(prevState => ({
      ...prevState,
      currency: event.target.value
    }));
  };

  const openModal = (event) => {
    event.preventDefault();
    handleCalculateTotal();
    setMainState(prevState => ({
      ...prevState,
      isOpen: true
    }));
  };

  const closeModal = () => setMainState(prevState => ({
    ...prevState,
    isOpen: false
  }));

  return (
    <>
      <Form onSubmit={openModal}>
        <Row className='justify-content-center'>
          <Col sm={12} md={8} lg={10}>
            <Card className="p-4 p-xl-5 my-3 my-xl-4 card-invoice">
              <Row>
                <Col sm={12} md={8}>
                  <Row>
                    <Col sm={12} md={6}>
                      <div className='d-flex justify-content-between align-items-center mt-2'>
                        <span className="fw-bold me-2">Invoice&nbsp;Number:&nbsp;</span>
                        <Form.Control
                          type="number"
                          value={mainState.invoiceNumber}
                          name="invoiceNumber"
                          onChange={editField}
                          min="1"
                          style={{ maxWidth: '70px' }}
                          required
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={6}></Col>
                    <Col sm={12} md={6}>
                      <div className='d-flex justify-content-between align-items-center mt-2'>
                        <span className="fw-bold">Current&nbsp;Date:&nbsp;</span>
                        <Form.Control
                          type="date"
                          value={mainState.currentDate}
                          name="dateOfIssue"
                          onChange={editField}
                          style={{ maxWidth: '200px' }}
                          readOnly
                          required
                        />
                      </div>
                      <div className='d-flex justify-content-between align-items-center mt-2'>
                        <span className="fw-bold me-2">Due&nbsp;Date:</span>
                        <Form.Control
                          type="date"
                          value={mainState.dateOfIssue}
                          name="dateOfIssue"
                          onChange={editField}
                          style={{ maxWidth: '200px' }}
                          required
                        />
                      </div>
                    </Col>
                    <Col sm={12} md={6}>
                      <div className='d-flex justify-content-between align-items-center mt-2'>
                        <span className="fw-bold">Name Bank</span>
                        <Form.Control
                          placeholder={"Name Bank"}
                          value={mainState.nameBank}
                          type="text"
                          name="nameBank"
                          style={{ maxWidth: '200px' }}
                          onChange={editField}
                          autoComplete="nameBank"
                          required
                        />
                      </div>
                      <div className='d-flex justify-content-between align-items-center mt-2 mb-2'>
                        <span className="fw-bold">ID Bank</span>
                        <Form.Control
                          placeholder={"ID Bank"}
                          value={mainState.idBank}
                          type="text"
                          name="idBank"
                          style={{ maxWidth: '200px' }}
                          onChange={editField}
                          autoComplete="idBank"
                          required
                        />
                      </div>
                    </Col>
                  </Row>
                </Col>
                <Col sm={12} md={4} className='d-flex justify-content-end mb-2'>
                  <div className="uploudImg">
                    <label htmlFor="gambar" >
                      {selectedImage ?
                        <img
                          src={selectedImage ? selectedImage : 'path_to_default_image'}
                          alt='logo'
                        />
                        : 'Upload Logo'}
                    </label>
                    <input
                      type="file"
                      id="gambar"
                      name="gambar"
                      accept="image/*"
                      onChange={handleImageUpload}
                      style={{ display: 'none' }}
                    />
                  </div>
                </Col>
              </Row>
              <div className="horizontal-line mb-4" />
              <Row className="mb-3">
                <Col>
                  <Form.Label className="fw-bold">Bill to:</Form.Label>
                  <Form.Control
                    placeholder={"Who is this invoice to?"}
                    rows={3}
                    value={mainState.billTo}
                    type="text"
                    name="billTo"
                    className="my-2"
                    onChange={editField}
                    autoComplete="name"
                    required
                  />
                  <Form.Control
                    placeholder={"Email address"}
                    value={mainState.billToEmail}
                    type="email"
                    name="billToEmail"
                    className="my-2"
                    onChange={editField}
                    autoComplete="email"
                    required
                  />
                  <Form.Control
                    placeholder={"Billing address"}
                    value={mainState.billToAddress}
                    type="text"
                    name="billToAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={editField}
                    required
                  />
                </Col>
                <Col>
                  <Form.Label className="fw-bold">Bill from:</Form.Label>
                  <Form.Control
                    placeholder={"Who is this invoice from?"}
                    rows={3}
                    value={mainState.billFrom}
                    type="text"
                    name="billFrom"
                    className="my-2"
                    onChange={editField}
                    autoComplete="name"
                    required
                  />
                  <Form.Control
                    placeholder={"Email address"}
                    value={mainState.billFromEmail}
                    type="email"
                    name="billFromEmail"
                    className="my-2"
                    onChange={editField}
                    autoComplete="email"
                    required
                  />
                  <Form.Control
                    placeholder={"Billing address"}
                    value={mainState.billFromAddress}
                    type="text"
                    name="billFromAddress"
                    className="my-2"
                    autoComplete="address"
                    onChange={editField}
                    required
                  />
                </Col>
              </Row>
              <Row>
                <Col md={4}>
                  <Form.Group className="mb-3">
                    <InputGroup className="my-1 flex-nowrap">
                      <Form.Control
                        name="taxRate"
                        type="number"
                        placeholder="Tax rate"
                        min="0"
                        step="0.01"
                        max="100"
                        value={mainState.taxRate}
                        onChange={editField}
                        className="bg-white border"
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
                        name="discountRate"
                        type="number"
                        placeholder="Discount rate"
                        min="0"
                        step="0.01"
                        max="100"
                        value={mainState.discountRate}
                        onChange={editField}
                        className="bg-white border"
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
                      onChange={event => onCurrencyChange(event)}
                      className="btn btn-light my-1"
                      aria-label="Change Currency"
                    >
                      <option value="Rp">RP (Indonesia Rupiah)</option>
                      <option value="$">USD (United States Dollar)</option>
                      <option value="£">GBP (British Pound Sterling)</option>
                      <option value="¥">JPY (Japanese Yen)</option>
                      <option value="$">CAD (Canadian Dollar)</option>
                      <option value="$">AUD (Australian Dollar)</option>
                      <option value="$">SGD (Signapore Dollar)</option>
                      <option value="¥">CNY (Chinese Renminbi)</option>
                      <option value="₿">BTC (Bitcoin)</option>
                    </Form.Select>
                  </Form.Group>
                </Col>
              </Row>

              <InvoiceItem
                onItemizedItemEdit={onItemizedItemEdit}
                onRowAdd={handleAddEvent}
                onRowDel={handleRowDel}
                currency={mainState.currency}
                items={items} />
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
                style={{ height: 100 }}
                placeholder="Thanks for your business!"
                name="notes"
                value={mainState.notes}
                onChange={editField}
                as="textarea"
                className="my-2"
                rows={1} />
              <div className='mt-3 d-flex align-items-center justify-content-end'>
                {/* <div className="form-check pe-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    value={mainState.isSignature}
                    onChange={handleIsSignatureChange}
                    id="flexCheckDefault"
                  />
                  <label className="form-check-label" htmlFor="flexCheckDefault">
                    With Signature
                  </label>
                </div> */}
                <Button variant="primary" type="submit">Review Invoice</Button>
              </div>
            </Card>
          </Col>
        </Row>
        <InvoiceModal
          Logo={selectedImage}
          showModal={mainState.isOpen}
          closeModal={closeModal}
          isSignature={mainState.isSignature}
          info={mainState}
          items={items}
          currency={mainState.currency}
          subTotal={mainState.subTotal}
          taxAmmount={mainState.taxAmount}
          discountAmmount={mainState.discountAmount}
          nameBank={mainState.nameBank}
          idBank={mainState.idBank}
          total={mainState.total} />
      </Form>
    </>
  );
};

export default InvoiceForm;
