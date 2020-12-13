const express = require("express")
// require("dotenv").config()
const dotenv = require("dotenv")
dotenv.config();
const app = express()

const cors = require("cors")
const mongoose = require("mongoose")

//parser
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//cors
app.use(cors())

//mongodb config
const mongoURI = process.env.MONGO_URI
mongoose.Promise = global.Promise;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}
mongoose.connect(mongoURI, options);

const db = mongoose.connection;
db.on("error", console.error.bind(console, "Connection Error"))
db.once("open", () => console.log("Connected to MongoDB!"))

//server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Listening to ${PORT}`))
