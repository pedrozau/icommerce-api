const router = require('express').Router()
const {userUpdate,userGetAll,userDelete,userGet} = require('../controller/user')
const {authorization, verifyAdmin} = require('../controller/verifyToken')

router.route("/").get(verifyAdmin,userGetAll)
router.route("/:id").get(verifyAdmin,userGet)
router.route("/:id").put(authorization,userUpdate)
router.route("/:id").delete(verifyAdmin,userDelete)


module.exports = router