import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Container from 'react-bootstrap/Container';
import InvoiceForm from './components/InvoiceForm';
import { BsLinkedin, BsGithub, BsFillGiftFill, BsInstagram, BsLink45Deg } from "react-icons/bs";

class App extends Component {
  render() {
    return (
      <div className="App d-flex flex-column align-items-center justify-content-center w-100">
        <Container>
          <div className='d-flex flex-column align-items-center mt-5'>
            <h1 className='title-header'>Elegant Invoice.</h1>
            <h1 className='title-header'>Every Time.</h1>
            <p className='desc-header'>
              Effortlessly send polished invoices to your clients.
              Professional-looking invoices, on-the-go, for faster payments. Simplify your invoicing process!
            </p>
          </div>
          <InvoiceForm />
          <div className='footer'>
            <p>&copy; CopyRight Muhammad Hanjarraes</p>
            <div>
              <a href='https://raess.fun/' className='footer-logo' target="_blank" rel="noopener noreferrer">
                <BsLink45Deg />
              </a>
              <a href='https://www.linkedin.com/in/muhammad-hanjarraes-61040828b/' className='footer-logo' target="_blank" rel="noopener noreferrer">
                <BsLinkedin />
              </a>
              <a href='https://github.com/hanjarraes' className='footer-logo' target="_blank" rel="noopener noreferrer">
                <BsGithub />
              </a>
              <a href='https://saweria.co/hanjarraes' className='footer-logo' target="_blank" rel="noopener noreferrer">
                <BsFillGiftFill />
              </a>
              <a href='https://www.instagram.com/raesshjr/' className='footer-logo' target="_blank" rel="noopener noreferrer">
                <BsInstagram />
              </a>
            </div>
          </div>
        </Container>
      </div>
    );
  }
}

export default App;
