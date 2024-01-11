const express = require('express');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const cors = require('cors')
const session = require('express-session');

// router
const userRouter = require('./Pages/Users/user.router');
const roleRouter = require('./Pages/Role/role.router');
const loginRouter = require('./Pages/Login/login.router');
const currencyRouter = require('./Pages/Currency/currency.router');
const invoiceRouter = require('./Pages/Invoice/invoice.router');
const invoiceStatusRouter = require('./Pages/InvoiceStatus/invoiceStatus.router');


const app = express()

const corOptions = {
    origin: 'http://localhost:3000'
}

// middleware
app.use(cors(corOptions))
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cookieParser());

app.use(session({
    secret: process.env.MY_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
}));

// API
app.get('/', (req, res,) => {
    res.send('Hello World!')
})
app.use(loginRouter)
app.use(userRouter)
app.use(roleRouter)
app.use(currencyRouter)
app.use(invoiceStatusRouter)
app.use(invoiceRouter)

// Port
const PORT = process.env.PORT

// Server

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})