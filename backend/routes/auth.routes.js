const express = require('express');
const router = new express.Router();
const { signup } = require('../controllers/auth.controller');


router.post("/sign-up", signup);

module.exports = router;