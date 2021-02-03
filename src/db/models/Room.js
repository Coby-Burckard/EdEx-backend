const { DataTypes } = require("sequelize")
const { v4 } = require("uuid")

const createRoom = (sequelize) =>
  sequelize.define("Room", {
    scores: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
    uuid: {
      type: DataTypes.STRING,
      set() {
        this.setDataValue("uuid", v4())
      },
    },
    name: {
      type: DataTypes.STRING,
    },
  })

module.exports = createRoom
