const express = require('express');

const router = express.Router();

const UserController = require('../app/controllers/userController');

// router.route('/')
//     .all() -> Auth entraria aqui por exemplo!
//     .get(UserController.index)
//     .post(UserController.store);

// router.route('/:_id')
//     .all() -> Auth entraria aqui por exemplo!
//     .get(UserController.show)
//     .patch(UserController.update)
//     .delete(UserController.delete);

router.get('/', UserController.index);

router.get('/:_id', UserController.show);

router.post('/', UserController.store);

router.patch('/:_id', UserController.update);

router.delete('/:_id', UserController.delete);

module.exports = router;