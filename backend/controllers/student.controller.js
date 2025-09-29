const Student = require("../models/studentSchema");
const { apiResponse } = require("../utils/apiResponse");
const statusCodes = require("../utils/statusCodes");
async function getStudentByNC(req, res) {
    try {
        const { nc } = req.query;
        const student =  await Student.findOne({nc});
        if(!student) {
            return apiResponse(res, "Student Not Found", null, statusCodes.NOT_FOUND);
        }
        return apiResponse(res, "Student Found", student, statusCodes.OK);
    } catch (error) {
        return apiResponse(res, error.message, error, statusCodes.NOT_FOUND);
    }
}

module.exports = {
    getStudentByNC
}