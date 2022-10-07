const  router = require('express').Router()
const {Login, Register} = require('../controller/auth')

router.route("/register").post(Register)
router.route("/login").post(Login)



module.exports = router 
