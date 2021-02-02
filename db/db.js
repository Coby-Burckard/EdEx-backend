const { Sequelize } = require("sequelize")
const createTeacher = require("./models/Teacher")
const createRoom = require("./models/Room")

const connect = async () => {
  const sequelize = new Sequelize({
    dialect: "postgres",
    storage: process.env.DB_PATH,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
  })

  await sequelize.authenticate()
  console.log("connection established with db")
  return sequelize
}

connect()
  .then((sequelize) => {
    //initializing models
    const Teacher = createTeacher(sequelize)
    const Room = createRoom(sequelize)

    //establishing associations
    Teacher.hasMany(Room)
    Room.belongsTo(Teacher)

    return sequelize.sync({ force: true })
  })
  .then((sequelize) => {
    console.log("synced with db")
    return sequelize
  })
  .catch((err) => console.error(err))
