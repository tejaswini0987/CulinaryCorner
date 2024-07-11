const mongoose = require('mongoose');

const CulinaryCornerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    description: {
        type: String
    },
    done:{
        type: Boolean
    }
});

module.exports = mongoose.model("CulinaryCorner", CulinaryCornerSchema);