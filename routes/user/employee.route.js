const router = require('express').Router();
const empController = require('../../controllers/user/employee.controller');
const is_auth = require('../../middleware/is_auth');


router.post('/create-emp' , is_auth,  empController.createEmployee)
router.get('/get-all-employees' , is_auth,  empController.getAllEmployees)
router.put('/update-employee' , is_auth,  empController.updateEmp)
router.delete('/delete-employee' , is_auth,  empController.deleteEmp)

module.exports = router