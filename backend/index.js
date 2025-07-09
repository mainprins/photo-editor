const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const authRouter = require('./routes/auth.route.js')
const mongoose = require('mongoose');
const app = express();

const dotenv = require("dotenv");
dotenv.config();

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log("Successfully connected to mongodb.");
}).catch(error => {
    console.log("Mongodb connection error : ", error);
});


app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use('/api/auth', authRouter);

app.listen(process.env.PORT, () => {
    console.log(`Listening at port ${process.env.PORT}`);
});