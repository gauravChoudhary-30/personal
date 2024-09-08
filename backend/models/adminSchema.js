const mongoose = require('mongoose');

const admin_schema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    phone: { type: Number, required: true }
}, { timestamps: true}
);

module.exports = mongoose.model("admin", admin_schema);