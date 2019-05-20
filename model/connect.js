const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)

mongoose.connection.once("open", () => {
    console.log("Sucessfully connected to database")
}).on("error", (error) => {
    console.log("There was some error connecting to the database", error)
})
