const express = require('express');
const router = express.Router();

const studentController = require('../controllers/student');
const { Authentication } = require('../middlewares/auth')

router.post("/register", studentController.Register)
router.post("/login", studentController.Login)
router.get("/all", Authentication, studentController.GetAllStudents)

module.exports = router;