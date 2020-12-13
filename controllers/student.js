const { Student } = require('../models/student')

exports.Register = async(req, res, next) => {
    try {
        let data = await Student.create(req.body);

        res.status(201).json({
            success : true,
            message : "Succesfully Registered!",
            data
        })
    } catch(err) {
        next(err);
    }
}