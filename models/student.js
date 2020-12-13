const mongoose = require("mongoose");
const { Schema } = mongoose;

//hash Password
const { encryptPassword } = require("../helpers/bcrypt")

const studentSchema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        match : [
            /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, 
            "Password required minimum eight characters, at least one letter and one number"
        ]
    },
    profile: { type: Schema.Types.ObjectId, ref: "Profile" },
}, { timestamps: true, versionKey: false }
)

//hooks
studentSchema.pre("save", async function(next) {
    let student = this
    if (student.password && student.isModified("password")) {
        student.password = await encryptPassword(student.password)
    }
    next()
})

const student = mongoose.model("Student", studentSchema)

exports.Student = student;