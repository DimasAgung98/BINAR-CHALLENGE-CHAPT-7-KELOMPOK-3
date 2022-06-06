//IMPORT ROUTER EXPRESS
const express = require('express');
const router = express.Router();


//CONTROLLER
const indexController = require('../controllers/index'); 
const gameController = require('../controllers/game');
const usersController = require('../controllers/users');
const auth = require('../controllers/api/authController');
const restrict = require('../middleware/restrict');

// ROUTE
router.get('/', indexController.index);
router.get('/game', gameController.index);
router.get('/user', usersController.index);

router.get('/', auth.index)
router.post('/register', auth.register)
router.post('/login', auth.login)
router.post('/login-token', restrict, auth.loginToken)

//EXPORT MODULE ROUTER
module.exports = router;