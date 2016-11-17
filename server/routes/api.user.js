const express = require('express');
const router = express.Router();

const controller = require('../controllers/api.user')

// register user
router.post('/', controller.newUser);

// login user
router.post('/login', controller.loginUser);

// //photo upload
// router.get('/', controller.photoUser)

module.exports = router;
