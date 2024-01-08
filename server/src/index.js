const express = require('express');
require('dotenv').config();
const cookieParser = require("cookie-parser");
const userRouter = require('./Pages/Users/user.router');
const roleRouter = require('./Pages/Role/role.router');
const loginRouter = require('./Pages/Login/login.router');
const cors = require('cors')
const app = express()

const corOptions = {
    origin: 'https://localhost:3000'
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

// API
app.get('/', (req, res,) => {
    res.send('Hello World!')
})
app.use(userRouter)
app.use(roleRouter)
app.use(loginRouter)

// Port
const PORT = process.env.PORT

// Server

app.listen(PORT, () => {
    console.log(`Example app listening at http://localhost:${PORT}`)
})