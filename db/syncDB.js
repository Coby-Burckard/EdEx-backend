const sequelize = require("./db")

const sync = async () => {
  sequelize.sync({ force: true })
  console.log("models were syncronized with DB")
}

module.exports = sync
