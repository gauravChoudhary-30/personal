const mongoose =  require('mongoose');

const student_schema =  new mongoose.Schema({
    nc: { type: Number, required: true, unique: true },
    student_name: { type: String, required: true },
    monthly_fee: { type: Number, required: true },
    going_from :{
        year: { type: Number, required: true},
        month: { type: Number, required: true },
        day:  { type: Number, required: true }
    },
    phone_number:  {type: Number, required: true },
    address: {
        qr_no: { type: String, required: true},
        sector_1: { type: Number, required: true },
        sector_2: { type: String, required: true}
    },
    school: { type: String, required: true},
    class_section: { type: String, required: true},
    no_of_students: { type: String, required: true},
}, { collection: "Students"});

module.exports =mongoose.model("Students", student_schema);