const mongoose = require("mongoose");
const AutoIncrement = require("../plugins/autoIncrement");

const dues_schema = new mongoose.Schema({
    id: { type:Number, unique: true},
    nc: { type: Number, required: true, unique: true },
    due_amount: {type: Number, required: true},
    lastUpdated:{ type: Date, required: true },
}, {collection: "Dues"});

dues_schema.plugin(AutoIncrement, { inc_field: "id", id: "dues_id_counter" });

module.exports = mongoose.model("Dues", dues_schema);