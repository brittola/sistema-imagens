const express = require('express');
const router = express.Router();
const UserService = require('./services/UserService');

router.get('/', (req, res) => {
    res.sendStatus(200);
});

router.post('/user', UserService.create);

router.post('/auth', UserService.auth);

router.delete('/user/:email', UserService.delete);

module.exports = router;