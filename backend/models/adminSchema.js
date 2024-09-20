const mongoose = require('mongoose');
const { encryptPassword } = require('../middleware/auth');

const admin_schema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true},
    password: { type: String, required: true },
    phone: { type: Number, required: true }
}, { timestamps: true}
);

admin_schema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();
    try{
        this.password = await encryptPassword(this.password);
        next();
    } catch (error) {
        next(error);
    }
})

module.exports = mongoose.model("admin", admin_schema);