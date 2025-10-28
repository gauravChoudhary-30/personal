const express =  require('express');
const { getSchools } = require('../controllers/school.controller');

const router =  new express.Router();

router.get("/getSchools", getSchools);
module.exports = router;