const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    projectname: String,
    projectgenre: String,
    data: { type: Object},  
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Project',projectSchema);