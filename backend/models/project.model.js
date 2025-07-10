const mongoose = require("mongoose");

const projectSchema = mongoose.Schema({
    projectname: String,
    projectgenre: String,
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
})

module.exports = mongoose.model('Project',projectSchema);