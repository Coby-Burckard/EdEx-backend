const { Sequelize } = require("sequelize")
const createTeacher = require("./models/Teacher")
const createRoom = require("./models/Room")

const sequelize = new Sequelize({
  dialect: "postgres",
  storage: process.env.DB_PATH,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
})

//setting up models
const Teacher = createTeacher(sequelize)
const Room = createRoom(sequelize)
Teacher.hasMany(Room)
Room.belongsTo(Teacher)

const validateConnection = async () => {
  try {
    await sequelize.authenticate()
    console.log("connection established with db")
    return sequelize
  } catch {
    console.error("Unable to connect to db")
  }
}

const syncDB = async () => {
  try {
    await sequelize.sync({ force: true })
    console.log("synced with DB")
  } catch {
    console.error("Unable to sync db")
  }
}

validateConnection()
syncDB()

module.exports = { sequelize, Teacher, Room }
