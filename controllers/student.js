const { Student } = require('../models/student')
const { decryptPassword } = require("../helpers/bcrypt")
const { tokenGenerator } = require("../helpers/jwt")

exports.Register = async (req, res, next) => {
    try {
        let data = await Student.create(req.body);

        res.status(201).json({
            success: true,
            message: "Succesfully Registered!",
            data
        })
    } catch (err) {
        next(err);
    }
}

exports.Login = async (req, res, next) => {
    try {
        const { username, password } = req.body;
        if (!username) next({ message: "Please enter your username" });
        if (!password) next({ message: "Please enter your password!" });

        let student = await Student.findOne({ username: username })
        if (!student) return next({ message: `Student with Username ${username} not found` });

        if (decryptPassword(password, student.password)) {
            const token = tokenGenerator(student)
            res.status(200).json({
                success: true,
                message: "Successfully logged in!",
                token: token
            })
        } else {
            next({ message: "Password incorrect!" })
        }
    } catch (err) {
        next(err)
    }
}

exports.GetAllStudents = async(req, res, next) => {
    try{
        let data = await Student.find()

        res.status(200).json({
            success: true,
            message: "Successfully get all Students!",
            data
        })

    } catch(err) {
        next(err)
    }
}