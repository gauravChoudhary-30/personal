const express =  require('express');
const { getSchools, addNewSchool } = require('../controllers/school.controller');

const router =  new express.Router();

router.get("/getSchools", getSchools);
router.post("/addSchool", addNewSchool);

module.exports = router;