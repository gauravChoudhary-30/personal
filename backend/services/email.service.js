require("dotenv").config();
const { sendSendGridEmail } = require("../helpers/senGrid.helper");

async function sendForgotPassword(email, otp) {
    const msg = {
        to: email,
        from: process.env.SENDER_EMAIL, // Your verified sender
        subject: 'Your OTP for Password Reset',
        text: `Your OTP for password reset is ${otp}. It will expire in 5 minutes.`,
        html: `<strong>Your OTP for password reset is ${otp}. It will expire in 5 minutes.</strong>`,
    };

    try {
        await sendSendGridEmail(msg);
        console.log('OTP email sent successfully');
    } catch (error) {
        console.error('Error sending OTP email', error);
        throw new Error('Error sending OTP email');
    }
}

module.exports = sendForgotPassword;