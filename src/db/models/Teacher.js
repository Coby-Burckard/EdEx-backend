const { DataTypes } = require("sequelize")
const crypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

const createTeacher = (sequelize) => {
  return sequelize.define("Teacher", {
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      set(value) {
        const hashPass = crypt.hashSync(value, 8)
        this.setDataValue("password", hashPass)
      },
    },
    jwt: {
      type: DataTypes.STRING,
      allowNull: true,
      set(value) {
        this.setDataValue(
          "jwt",
          jwt.sign({ email: value }, process.env.API_SECRET)
        )
      },
    },
  })
}

module.exports = createTeacher
