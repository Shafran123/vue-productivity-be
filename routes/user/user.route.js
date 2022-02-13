const router = require('express').Router();
const userController = require('../../controllers/user/user.controller');
const is_auth = require('../../middleware/is_auth');

router.post('/login' ,  userController.loginAsUser)
router.post('/register-admin-user',  userController.registerAsUser)
router.post('/create-team' , is_auth,  userController.createTeam)
router.get('/get-all-teams' , is_auth,  userController.getAllTeams)
router.put('/update-team' , is_auth,  userController.updateTeam)
router.delete('/delete-team' , is_auth,  userController.deleteTeam)

router.get('/user' , (req, res)=>{
    res.json({
        posts:{
            title : 'first post'
        }
    })
})

module.exports = router