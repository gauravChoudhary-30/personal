const { verifyPassword } = require('../middleware/auth');
const OTPStorage = require('../middleware/OTPStorage');
const Admin = require('../models/adminSchema');
const sendForgotPassword = require('../services/email.service');
const { generateOTP } = require('../services/otp.service');
const { apiResponse } = require('../utils/apiResponse');
const { emailValidation } = require('../utils/commonUtils');
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

async function forgotPassword (req, res) {
    try{
        const { email } = req.body;
        emailValidation(email);
        const admin = await Admin.findOne({
                email: email
        })
        if (!admin) {
            return apiResponse(res, 'Admin not found', null, statusCodes.NOT_FOUND);
        }
        
        const otp = generateOTP();

        await sendForgotPassword(email, otp);

        await OTPStorage.save(email, otp);

        return apiResponse(res, 'OTP sent to your email', null, statusCodes.OK);

    } catch (error) {
        console.error(error);
        return apiResponse(res, 'Internal server error', null, statusCodes.INTERNAL_SERVER_ERROR);
    }
}

async function validateOTP(req, res) {
    try{ 
        const {email, otp} = req.body;
        const isValid = await OTPStorage.verify(email, otp);

        if (!isValid) {
            return apiResponse(res, 'Invalid OTP', null, statusCodes.UNAUTHORIZED);
        }
        
        // OTP is valid, authenticate the user
        return apiResponse(res, 'OTP verified', null, statusCodes.OK);
        
    } catch (error) {
        console.error(error);
        return apiResponse(res, 'Internal server error', null, statusCodes.INTERNAL_SERVER_ERROR);
    }
}
module.exports = {
    signup,
    signin,
    forgotPassword,
    validateOTP
}