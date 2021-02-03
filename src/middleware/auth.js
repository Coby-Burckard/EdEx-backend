const jwt = require("jsonwebtoken")
const { Teacher, Room } = require("../db/db")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.API_SECRET)

    if (!token) {
      throw new Error("no token provided")
    }

    const teacher = await Teacher.findOne({
      where: {
        email: decoded.email,
        jwt: token,
      },
      include: Room,
    })

    if (!teacher) {
      throw new Error("no teacher found")
    }

    req.teacher = teacher

    next()
  } catch (error) {
    res.status(401).send({ error: "Please authenticate" })
  }
}

module.exports = auth
