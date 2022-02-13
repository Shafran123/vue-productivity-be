const { userLoginValidation, createTeamValidation } = require("../../validators/user.validation")
const Users = require('../../models/user.model')
const Teams = require("../../models/team.model")

exports.loginAsUser = async (req, res) => {
    console.log(req.body, 'Login')
    //Validation 
    const { error } = userLoginValidation(req.body)

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


    //User Check
    const isUserAvailable = await Users.findOne({ email: req.body.email })


    if (!isUserAvailable) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": " Seems like you dont have account "
                }
            })
        )
    }

    //PasswordComaprison
    const validPassword = await bycrpt.compare(req.body.password, isUserAvailable.password)
    if (!validPassword) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": "Incorrect Password"
                }
            })
        )
    }

    //creating a token
    const token = jwt.sign({ _id: isUserAvailable._id }, process.env.TOKEN_SECRET)
    res.header('auth-Token', token).send({
        status: 200,
        success: 'true',
        token: token,
        user: {
            userId: isUserAvailable._id,
            user_email: isUserAvailable.email,
            user_role: 1,
        },
        message: 'User Login Sucessfull'
    })

}

exports.createTeam = async (req, res) => {
    //Validation
    const { error } = createTeamValidation(req.body)


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

    //check isTeamExist
    const isTeamExist = await Teams.findOne({ team_code: req.body.team_code })

    if (isTeamExist) {
        return (
            res.status(400).send({
                code: 400,
                error: {
                    "status": "Bad reaquest",
                    "message": 'Team Already Exixts'
                }
            })
        )
    }

    const team = new Teams({
        team_code: req.body.team_code,
        team_name: req.body.team_name,
        start_date: req.body.start_date,
        end_date: req.body.end_date,
        status: req.body.status,
    });

    console.log('team', team)

    try {
        const addedTeam = await team.save();

        res.status(200).send({ success: 'true', addedTeam, message: 'Team Added Sucessfull' })
    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}


exports.getAllTeams = async (req, res) => {


    //check isTeamExist

    try {
        const teamList = await Teams.find()
        console.log(teamList, 'teamList');

        res.status(200).send({ success: 'true', data: teamList, message: 'teamList Fetch Sucessfully' })

    } catch (err) {

        res.status(500).send({ status: 500, message: err })
    }
}


exports.updateTeam = async (req, res) => {

    var team_code = req.query.team_code

    //Validation
    const { error } = createTeamValidation(req.body)


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
        const isTeamExist = await Teams.findOneAndUpdate({ team_code: team_code }, req.body)

        console.log(isTeamExist, ';isTeamExist')

        if (!isTeamExist) {
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
            res.status(200).send({ success: 'true', message: 'Team Edited Sucessfully!' })
        }

    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}


exports.deleteTeam = async (req, res) => {

    var team_code = req.query.team_code

    try {
        //check isTeamExist
        const isTeamExist = await Teams.findOneAndDelete({ team_code: team_code })

        console.log(isTeamExist, ';isTeamExist')

        if (!isTeamExist) {
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
            res.status(200).send({ success: 'true', message: 'Team Deleted Sucessfully!' })
        }

    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

