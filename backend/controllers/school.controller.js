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

module.exports = {
    getSchools
}