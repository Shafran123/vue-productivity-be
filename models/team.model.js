const mongoose = require('mongoose')


const teamsSchema = new mongoose.Schema({

    team_code: {
         type : String,
         unique: true,
         required: true,
         min : 6,
         max :255
    },
    team_name:{
        type : String,
        required: true,
    },
    start_date:{
        type: Date,
        required: true,
        default :Date.now
    },
    team_members:{
        type:Array
    },
    end_date:{
        type: Date,
        default : null
    },
    status:{
        type: Boolean,
        default: true
    }
});


module.exports = mongoose.model('teams' , teamsSchema)