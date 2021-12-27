const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const validationResult = require('express-validator');

// import routes
const authRoutes = require('./routes/auth')
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const productRoutes = require('./routes/product')

// import controllers
// const { signup } = require('./controllers/User')

// app
const app = express();
require('dotenv').config();

// ddb
mongoose.connect(process.env.DATABASE, {
        useNewUrlParser: true,
        // useCreateIndex: true
    })
    .then(() => console.log('DB CONNECTED'));

// middlewares
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser())
    // app.use(validationResult());


// routes
app.use('/api', authRoutes)
app.use('/api/users', userRoutes)
app.use('/api/categories', categoryRoutes)
app.use('/api/products', productRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})