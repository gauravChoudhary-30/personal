const express =  require('express');
const { getStudentByNC, getAllStudents } = require('../controllers/student.controller');
const router =  new express.Router();

router.get("/getStudentByNC", getStudentByNC);
router.get("/getAllStudents", getAllStudents);
module.exports = router;