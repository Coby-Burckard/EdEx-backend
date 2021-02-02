const { DataTypes } = require("sequelize")

const createRoom = (sequelize) =>
  sequelize.define("Room", {
    scores: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
    },
  })

module.exports = createRoom
