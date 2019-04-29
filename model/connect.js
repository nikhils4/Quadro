const mongoose = require("mongoose")

console.log(process.env.MONGO_URI)
mongoose.connect(process.env.MONGO_URI)

console.log(mongoose.connection);

mongoose.connection.once("open", () => {
    console.log("Sucessfully connected to database")
}).on("error", (error) => {
    console.log("There was some error connecting to the database", error)
})
