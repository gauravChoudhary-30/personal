const express = require('express');
const router = new express.Router();
const { signup, signin, forgotPassword, validateOTP } = require('../controllers/auth.controller');
const { validate } = require("../joi/helper.validate");
const { signinValidate, signupValidate, forgotPassValidate, otpValidate } = require('../joi/auth.validate')

router.post("/sign-up", validate(signupValidate, 'body'), signup);
router.get("/sign-in", validate(signinValidate, 'body'), signin);
router.post("/forgot-password", validate(forgotPassValidate, 'body'), forgotPassword);
router.post("/validate-otp",validate(otpValidate, 'body'), validateOTP);

module.exports = router;