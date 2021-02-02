const jwt = require("jsonwebtoken")
const { Teacher } = require("../db/db")

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "")
    const decoded = jwt.verify(token, process.env.API_SECRET)

    const teacher = await Teacher.findAll({
      where: {
        email: decoded.email,
        jwt: token,
      },
    })

    req.teacher = teacher

    next()
  } catch {
    res.status(401).send({ error: "Please authenticate" })
  }
}
