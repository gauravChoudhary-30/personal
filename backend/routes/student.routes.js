const express =  require('express');
const { getStudentByNC } = require('../controllers/student.controller');
const router =  new express.Router();

router.get("/getStudentByNC", getStudentByNC);

module.exports = router;