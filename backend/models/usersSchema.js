const mongoose = require('mongoose');

const users_schema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    firstName: { type: String, required: true },
    middleName: { type: String, required: true},
    lastName: { type: String, required: true },
    phoneNumber: { type: Number, required: true, unique: true },
    isSuperAdmin: { type: Boolean, default: false }
}, { collection: "Users" });

module.exports = mongoose.model("Users", users_schema);