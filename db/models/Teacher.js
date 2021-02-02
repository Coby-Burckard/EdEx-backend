const { DataTypes } = require("sequelize")

const createTeacher = (sequelize) =>
  sequelize.define("Teacher", {
    email: {
      type: DataTypes.STRING,
    },
    password: {
      type: DataTypes.STRING,
    },
    jwt: {
      type: DataTypes.STRING,
    },
  })

module.exports = createTeacher
