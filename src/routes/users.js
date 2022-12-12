const express = require('express');

const router = express.Router();

const UserController = require('../app/controllers/userController');

router.route('/')
    .get(UserController.index)
    .post(UserController.store);

router.route('/:_id')
    .get(UserController.show)
    .patch(UserController.update)
    .delete(UserController.delete);

module.exports = router;