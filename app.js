if (process.env.NODE_ENV !== "production") {
  require("dotenv").config()
}

require("./db/db")
const syncDB = require("./db/syncDB")
