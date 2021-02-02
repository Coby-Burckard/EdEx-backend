const express = require("express")

console.log("node_env", process.env.NODE_ENV)
if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

//setting up db
require("./src/db/db")

//setting up express
const app = express()
const PORT = process.env.PORT || 3000

//configuring app
app.use(express.json())

//starting server
app.listen(PORT, () => {
  console.log("server running on port", PORT)
})
