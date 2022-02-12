const Employee = require("../../models/employee.model")
const { createEmpValidation } = require("../../validators/user.validation")

exports.createEmployee = async (req, res) => {
    //Validation
    const { error } = createEmpValidation(req.body)


    if (error) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": error.details[0].message
                }
            })
        )
    }

    //check isEmployeeExist
    const isEmployeeExist = await Employee.findOne({ emp_code: req.body.emp_code })

    if (isEmployeeExist) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": 'Employee Already Exixts'
                }
            })
        )
    }

    const employee = new Employee({
        emp_code: req.body.emp_code,
        emp_name: req.body.emp_name,
        join_date: req.body.join_date,
        team_code: req.body.team_code
    });

    console.log('employee', employee)

    try {
        const addedEmp = await employee.save();

        res.status(200).send({ success: 'true', addedEmp, message: 'Team Added Sucessfull' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

exports.getAllEmployees = async (req, res) => {


    //check isTeamExist

    try {
        const empList = await Employee.find()
        console.log(empList, 'empList');

        res.status(200).send({ success: 'true', data: empList, message: 'empList Fetch Sucessfully' })

    } catch (err) {

        res.status(500).send({ status: 500, message: err })
    }
}



exports.updateEmp = async (req, res) => {

    var emp_code = req.query.emp_code

    //Validation
    const { error } = createEmpValidation(req.body)


    if (error) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": error.details[0].message
                }
            })
        )
    }

    try {
        //check isTeamExist
        const isEmployeeExist = await Employee.findOneAndUpdate({ emp_code: emp_code }, req.body)

        console.log(isEmployeeExist, ';isEmployeeExist')

        if (!isEmployeeExist) {
            return (
                res.status(400).send({
                    code: 400,
                    error: {
                        "status": "Bad reaquest",
                        "message": 'Team Doenst Exixts to Update'
                    }
                })
            )
        } else {
            res.status(200).send({ success: 'true', message: 'Employee Edited Sucessfully!' })
        }

    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}


exports.deleteEmp = async (req, res) => {

    var emp_code = req.query.emp_code

    try {
    //check isTeamExist
    const isEmployeeExist = await Employee.findOneAndDelete({ emp_code: emp_code })

    console.log(isEmployeeExist , ';isEmployeeExist')
    
    if (!isEmployeeExist) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": 'Employee Doenst Exixts to perform Delete'
                }
            })
        )
    }else{
        res.status(200).send({ success: 'true' , message: 'Employee Deleted Sucessfully!' })
    }

    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }
    
    }