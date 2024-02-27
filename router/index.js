const router = require('express').Router();
const auth = require('./auth');
const todo=require('./todo')

router.use(auth, todo);


module.exports = router;
