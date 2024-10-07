const twilio = require('twilio')(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
);

async function sendSMS(phone, message) {
    const fromNumber = process.env.TWILIO_PHONE_NUMBER;
    const toNumber = phone.startsWith('+') ? phone : `+91${phone}`;
    await twilio.messages.create({
        body: message,
        to: toNumber,
        from: fromNumber
    });
}

module.exports = {
    sendSMS
};