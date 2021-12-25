const express = require('express');
const mongoose = require('mongoose')

// import routes
const userRoutes = require('./routes/user')

// app
const app = express()
require('dotenv').config()

// ddb
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser:true,
    // useCreateIndex:true
})
    .then(() => console.log('DB CONNECTED'));
// mongoose.connect(process.env.DATABASE, {
//     useNewUrlParser: true,
//     useCreateIndex: true
// }).then(()=> console.log('DB connected'));


// routes
app.use(userRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})