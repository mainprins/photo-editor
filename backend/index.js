const express = require('express');
const cors = require('cors');
const authRouter = require('./routes/auth.route.js')
const mongoose = require('mongoose');
const app = express();

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("Successfully connected to mongodb.");
}).catch(error => {
    console.log("Mongodb connection error : ",error); 
});


app.use(express.json());
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use('/api/auth',authRouter);

app.listen(process.env.PORT,()=>{
    console.log(`Listening at port ${process.env.PORT}`);
});