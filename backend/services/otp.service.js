const crypto = require('crypto');
const smsService = require('../helpers/sms.helper');

function generateOTP() {
    return crypto.randomInt(100000, 999999).toString();
}

async function sendOTP(phone, otp) {
    const message = `Hi Customer! ${otp} is your OTP (one time password) for the forgot password. Kindly don't share the OTP.`;
    await smsService.sendSMS(phone, message);
}

module.exports = {
    generateOTP,
    sendOTP
};