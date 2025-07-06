const express = require('express');
const userModel = require('../models/user.model');
const { signup,logout, login } = require('../controllers/auth.controller.js');
const router = express.Router();

router.post('/signup', signup);
router.post('/logout',logout);
router.post('/login',login);

module.exports = router;