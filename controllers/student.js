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

exports.Edit = async(req, res, next) => {
    try {
        const {_id} = req.userData

        // console.log(_id)

        if (!_id) return next({message: "Missing ID Params"})

        const student = await Student.findById(_id)

        if (!student) return next({message: `There is no user with _id:${_id}`})

        const updateStudent = await Student.findByIdAndUpdate(_id, 
          {$set: req.body},
          {new: true, runValidators: true}
        )

        res.status(200).json({
            success: true,
            message: "Successfully update a student!",
            data: updateStudent,
          });

    } catch(err) {
        next(err)
    }
}

exports.Delete = async(req, res, next) => {
    try {
        const {_id} = req.userData

        // console.log(_id)

        if (!_id) return next({message: "Missing ID Params"})

        const student = await Student.findById(_id)

        await Student.findByIdAndRemove(_id, (error, doc, result) => {
            if (error) return "Failed to delete student!"
            if (!doc) return res.status(400).json({success:false, err: "Student not found!"})
            
            res.status(200).json({
                success: true,
                message: "Successfully delete a student!",
                data: doc,
              });
        })

        res.status(200).json({
            success: true,
            message: "Successfully update a user!",
            data: updateStudent,
          });

    } catch(err) {
        next(err)
    }
}