const mongoose = require('mongoose')


const employeeSchema = new mongoose.Schema({

    emp_code: {
         type : String,
         unique: true,
         required: true,
    },
    emp_name:{
        type : String,
        required: true,
    },
    team_code:{
        type: String,
        required: true,
    },
    join_date:{
        type: Date,
        required: true,
        default :Date.now
    }
});


module.exports = mongoose.model('employee' , employeeSchema)