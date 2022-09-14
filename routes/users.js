const express = require('express');

const router = express.Router();

const { 
    getUsers, 
    createUser, 
    updateUser, 
    deleteUser 
} = require('../controllers/userController');

router.get('/', (req, res) => {
    getUsers(req, res);
});

router.get('/:_id', async (req, res) => {
    getUsers(req, res);
});

router.post('/', async (req, res) => {
    createUser(req, res);
});

router.patch('/:_id', async (req, res) => {
    updateUser(req, res);	
});

router.delete('/:_id', async (req, res) => {
    deleteUser(req, res);
});

module.exports = router;