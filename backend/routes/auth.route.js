const express = require('express');
const userModel = require('../models/user.model');
const { signup,logout, login } = require('../controllers/auth.controller.js');
const checkAuth = require('../middlewares/auth.middleware.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/logout',logout);
router.post('/login',login);
router.get('/isAuth',checkAuth,(req, res) => {
  res.status(200).json({message: "Authorized successfully." });
});

module.exports = router;