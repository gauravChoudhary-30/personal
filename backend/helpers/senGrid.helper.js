require("dotenv").config();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendSendGridEmail = async (data) => {
    try{
        const response = await sgMail.send(data);
        return response; 
    } catch(error) {
        throw(error);
    }
};   

module.exports = {
    sendSendGridEmail,
  };