const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student');

router.post("/register", studentController.Register)
router.post("/login", studentController.Login)

module.exports = router;