const express = require('express');
const mongoose = require('mongoose')
const morgan = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

// import routes
const userRoutes = require('./routes/user')

// import controllers
const { sayHi } = require('./controllers/User')

// app
const app = express()
require('dotenv').config()

// ddb
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        // useCreateIndex:true
    })
    .then(() => console.log('DB CONNECTED'));
// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true
// }).then(()=> console.log('DB connected'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser())


// routes
app.use('/api', userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})