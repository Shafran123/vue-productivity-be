var express = require('express');
var cors = require('cors')
mongoose = require('mongoose')
const dotenv = require('dotenv')
bycrpt = require('bcryptjs')
jwt = require('jsonwebtoken')

//Routes
const userRoute = require('./routes/user/user.route');
const empRoute = require('./routes/user/employee.route');
const tasksRoute = require('./routes/user/tasks.route');


var app = express();

dotenv.config();

//balance = process.env.BALANCE
const port = process.env.PORT || 2400

console.log(process.env.mongo_db);

//DB Connection
mongoose.connect(process.env.mongo_db,{ useNewUrlParser: true , useUnifiedTopology: true  }, (err) =>{
    console.log('connected to DB' , err)
}); 

app.use(express.json());
app.use(cors())

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    // Pass to next layer of middleware
    next();
})

app.use('/api/v1/user', userRoute)

app.use('/api/v1/emp', empRoute)

app.use('/api/v1/task', tasksRoute)

app.listen(port, function () {
    console.log(`JobSite listening on port ${port}!`);
});