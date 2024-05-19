const express = require('express');
const { register } = require('../../controllers/authController');
const router = express.Router();

router.post('/', register);

module.exports = router;
