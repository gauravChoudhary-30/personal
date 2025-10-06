const mongoose = require("mongoose");
const AutoIncrement = require("../plugins/autoIncrement");

const payment_schema = new mongoose.Schema({
    id: { type:Number, unique: true},
    nc: { type: Number, required: true },
    paid_amount: { type: Number, required: true },
    paid_month: { type: [String], required: true},
    paid_no_of_months: {type: Number, required:true},
    payment_date:{type: Date, default: Date.now, required: true},
    year: {type: Number, required: true},
    mode: {type: String, enum: ['cash', 'online'], required: true, default: "cash"},
    taken_by:{ type: String, enum: ['sudhir', 'rajesh', 'karuna'], required: true}

}, {collection: "Payments"});

payment_schema.plugin(AutoIncrement, { inc_field: "id", id: "payment_id_counter" });

module.exports = mongoose.model("Payments", payment_schema)