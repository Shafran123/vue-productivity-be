const Task = require("../../models/task.model")
const { createEmpValidation } = require("../../validators/user.validation")

exports.uploadTask = async (req, res) => {

    let rawTaskData = req.file.buffer

    let data = JSON.parse(rawTaskData)

    try {
        //check isTeamExist
        const isTaskAlreadyExist = await Task.findOne({ task_code: data.task_code })

        console.log(isTaskAlreadyExist, ';isTaskAlreadyExist')

        if (!isTaskAlreadyExist) {
            console.log('add new tsk')
            const task = new Task(data);


            console.log('task', task)

            try {
                const addedTask = await task.save();

                res.status(200).send({ success: 'true', addedTask, message: 'Team Added Sucessfull' })
            } catch (err) {
                res.status(400).send({ status: 400, message: err })
            }



        } else {
            console.log('update  tsk')

            try {
                const updatedTask = await Task.findOneAndUpdate({ task_code: data.task_code }, data)

                console.log(updatedTask)

                if (!updatedTask) {
                    return (
                        res.status(400).send({
                            code: 400,
                            error: {
                                "status": "Bad reaquest",
                                "message": 'Team Doenst Exixts to Update'
                            }
                        })
                    )
                }else{
                    res.status(200).send({ success: 'true' , message: 'Task Updated Sucessfully!' })
                }

            }catch(err) {
                res.status(400).send({ status: 400, message: err })
            }

            // res.status(200).send({ success: 'true' , message: 'Employee Deleted Sucessfully!' })
        }

    } catch (err) {
        res.status(400).send({ status: 400, message: err })
    }

}

exports.getAllTasks = async (req, res) => {

    
    //check isTeamExist

    try {
        const taskList = await Task.find({'group': 'status'})
        console.log(taskList, 'taskList');
        //console.log(taskList.filter(task => task.status == 'Completed'), 'taskList' );

        let structuredData = {
           
            backlog_tasks: taskList.filter(task => task.status == 'Backlog'),
            inprogress_tasks: taskList.filter(task => task.status == 'Inprogress'),
            completed_tasks : taskList.filter(task => task.status == 'Completed')

        }

        res.status(200).send({ success: 'true', data: structuredData, message: 'teamList Fetch Sucessfully' })

    } catch (err) {

        res.status(500).send({ status: 500, message: err })
    }
}