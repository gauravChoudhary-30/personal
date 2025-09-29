const express = require('express');
const authRoutes = require('./auth.routes');
const studentRoutes = require('./student.routes');
const router = express.Router();


router.use("/auth",authRoutes);  // using all the routes present in auth with /auth as the prefix
router.use("/student", studentRoutes);

module.exports = router;