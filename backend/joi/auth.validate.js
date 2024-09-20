const JoiBase = require('joi');
const JoiDate = require('@joi/date');
const Joi = JoiBase.extend(JoiDate);

const auth = {
    signinValidate: Joi.object().keys({
        username: Joi.string().required().messages({
            "string.empty": "Username is required.",
        }),
        password: Joi.string().required().messages({
            "string.empty": "Password is required.",
        }),
    }),
    signupValidate: Joi.object().keys({
        name: Joi.string().required().messages({
            "any.required": "Name is required.",
            "string.empty": "Name is required.",
        }),
        username: Joi.string().required().messages({
            "string.empty": "Username is required.",
        }),
        email: Joi.string().email().required().messages({
            "any.required": "Email is required.",
            "string.empty": "Email is required.",
            "string.email": "Email must be valid.",
        }),
        password: Joi.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{6,}$/).required().messages({
            "string.pattern.base": "The password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.",
            "string.min": "Password must be at least 6 characters long.",
            "string.empty": "Password is required.",
        }),
        phone: Joi.string().regex(/^[0-9]{10}$/).required().messages({
            "any.required": "Phone number is required.",
            "string.empty": "Phone number cannot be empty.",
            "string.pattern.base": "Phone number is invalid, it must be exactly 10 digits.",
        })
    })
};

module.exports = auth;
