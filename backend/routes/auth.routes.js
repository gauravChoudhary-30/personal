const express = require('express');
const router = new express.Router();
const { signup, signin } = require('../controllers/auth.controller');
const { validate } = require("../joi/helper.validate");
const { signinValidate, signupValidate } = require('../joi/auth.validate')


router.post("/sign-up", validate(signupValidate, 'body'), signup);
router.get("/sign-in", validate(signinValidate, 'body'), signin);

module.exports = router;