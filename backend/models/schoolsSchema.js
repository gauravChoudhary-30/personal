const mongoose =  require('mongoose');

const school_schema =  new mongoose.Schema({
    name: {type: String, required: true, trim: true},
    slug: {type: String, required: true, unique: true, lowercase: true, trim: true}
}, { collection: "Schools"});

module.exports =mongoose.model("Schools", school_schema);