const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({

    message : {
        type: String,
        required : true
    }

});


module.exports = mongoose.model('Todos', todoSchema);