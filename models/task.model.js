const mongoose = require('mongoose')


const taskSchema = new mongoose.Schema({

    task_code: {
         type : String,
         unique: true,
         required: true,
    },
    task_name:{
        type : String,
        required: true,
    },
    description:{
        type: String,

    },
    project:{
        type:String
    },
    logs:{
        type: Array,
    },
    status:{
        type: String,
    }
});


module.exports = mongoose.model('tasks' , taskSchema)