const { verifyPassword } = require('../middleware/auth');
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

async function signin ( req, res ) {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({
            username: username,
        });
        if(!admin) {
            return apiResponse(res, "Admin not found", null, statusCodes.NOT_FOUND);
        }
        const isValidPassword = await verifyPassword(password, admin.password);

        if (!isValidPassword) {
            return apiResponse(res, "Invalid password", null, statusCodes.UNAUTHORIZED);
        }

        return apiResponse(res, "Admin Sign-in Successfull", admin, statusCodes.OK);
    } catch (error) {
        return apiResponse(res, error.message, error, statusCodes.NOT_FOUND);
    }
}
module.exports = {
    signup,
    signin
}