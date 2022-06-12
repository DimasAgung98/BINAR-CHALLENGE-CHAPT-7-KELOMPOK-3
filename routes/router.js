//IMPORT ROUTER EXPRESS
const express = require('express');
const router = express.Router();


//CONTROLLER
const indexController = require('../controllers/index'); 
const gameController = require('../controllers/game');
const usersController = require('../controllers/users');
const authController = require('../controllers/api/authController');
const restrict = require('../middleware/restrict');
const gameroomController = require('../controllers/api/gameController');

// ROUTE
router.get('/', indexController.index);
router.get('/game', gameController.index);
router.get('/user', usersController.index);
router.get('/view-room', gameroomController.viewAllRoom);
//LOGIN AND REGISTER ROUTE
router.get('/', authController.index);
router.post('/register', authController.register);
router.post('/login', authController.login);
router.post('/login-token', restrict, authController.loginToken);
//FIGHT AND CREATE ROOM ROUTE
router.post('/create-room', restrict, gameroomController.createRoom);
router.post('/join-room', restrict, gameroomController.joinRoom);
router.post('/fight/:room_id', restrict, gameroomController.fightRoom);
router.post('/view-room/:id', gameroomController.viewRoom);

//EXPORT MODULE ROUTER
module.exports = router;