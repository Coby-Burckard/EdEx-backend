const express = require("express")
const cors = require("cors")

console.log("node_env", process.env.NODE_ENV)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

//modules which require .env file
require("./src/db/db")
const teacherRouter = require("./src/routers/teacher")
const wakeRouter = require("./src/routers/wakeup")
const roomRouter = require("./src/routers/room")

//setting up express
const app = express()
const PORT = process.env.PORT || 4000

//configuring app
app.use(express.json())
app.use(cors({
  origin: process.env.CLIENT_URL
}))

//routers
app.use(teacherRouter)
app.use(roomRouter)
app.use(wakeRouter)

//starting server
app.listen(PORT, () => {
  console.log("server running on port", PORT)
})
