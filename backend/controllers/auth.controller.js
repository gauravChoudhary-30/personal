const Admin = require('../models/adminSchema');
const { apiResponse } = require('../utils/apiResponse');
const statusCodes = require('../utils/statusCodes');
async function signup (req, res) {
    try{
        const { name, username, email, password, phone } = req.body;
        const admin = await Admin.create({
          name: name,
          username: username,
          email: email,
          password: password,
          phone: phone,
        });

        return apiResponse(res, "Admin Added Successfully", admin, statusCodes.CREATED );
    } catch (error) {
        return apiResponse(res, error.message, error, statusCodes.INTERNAL_SERVER_ERROR);
    }
    
}

module.exports = {
    signup
}