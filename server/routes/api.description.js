const express = require('express');
const router = express.Router();

const controller = require('../controllers/api.description')

// new description
router.post('/', controller.newDescription);

// show all description
router.get('/', controller.showAllDescription);

// edit a description
router.put('/:id', controller.editDescription);

// delete a description
router.delete('/:id', controller.deleteDescription);

// seed data
router.post('/seed', controller.seedDescription);

// delete all data
router.delete('/', controller.deleteAllDescription);

module.exports = router;
