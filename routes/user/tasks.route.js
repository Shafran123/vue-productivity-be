const router = require('express').Router();
const taskController = require('../../controllers/user/tasks.controller');
const is_auth = require('../../middleware/is_auth');
const multer = require("multer");
const upload = multer()

router.post('/upload-task' , is_auth, upload.single('file'), taskController.uploadTask)
router.get('/get-all-tasks' , is_auth,  taskController.getAllTasks)
// router.put('/update-employee' , is_auth,  empController.updateEmp)
// router.delete('/delete-employee' , is_auth,  empController.deleteEmp)

module.exports = router