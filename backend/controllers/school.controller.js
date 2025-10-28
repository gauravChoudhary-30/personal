const Schools = require("../models/schoolsSchema");
const { apiResponse } = require("../utils/apiResponse");
const statusCodes = require("../utils/statusCodes");

async function getSchools(req, res) {
    try {
        const all_schools = await Schools.find();
        if(!all_schools) {
            return apiResponse(res, "Schools Not Found", null, statusCodes.NOT_FOUND);
        }
        return apiResponse(res, "Schools Found", all_schools, statusCodes.OK);
    } catch (error) {
        return apiResponse(res, "Error Fetching Schools", null, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function addNewSchool(req, res) {
    try {
        const { name, slug } = req.body;
        const school =  await Schools.findOne({slug});
        if(school) {
            return apiResponse(res, "School with this Name or Slug already exists", null, statusCodes.CONFLICT);
        }
        const newSchool =  await Schools.create({name, slug});
        return apiResponse(res, "School Added Successfully",newSchool, statusCodes.CREATED);
    } catch (error) {
        return apiResponse(res, "Error Adding School", null, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

module.exports = {
    getSchools,
    addNewSchool
}