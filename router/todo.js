const router = require('express').Router();
const {create, list, update, remove} = require("../controller/todo");
const {verifyToken} = require("../middleware/authentication");

router.post('/todo-create', verifyToken, create)
router.get('/todo-list', verifyToken, list)
router.put('/todo-update/:id', verifyToken, update)
router.delete('/todo-remove/:id', verifyToken, remove)

module.exports = router;
