const express = require("express")
const crypt = require("bcryptjs")
const { Teacher } = require("../db/db")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/teachers", async (req, res) => {
  try {
    const { email, password } = req.body
    const teacher = await Teacher.create({
      email: email,
      password: password,
      jwt: email,
    })
    res.status(201).send({ jwt: teacher.jwt })
  } catch (error) {
    res.status(400).send()
  }
})

router.post("/teachers/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const teacher = await Teacher.findOne({ email })
    const isMatch = await crypt.compare(password, teacher.password)

    if (!isMatch) {
      throw new Error("Invalid login")
    }

    teacher.jwt = email
    await teacher.save()

    res.status(200).send({ jwt: teacher.jwt })
  } catch (error) {
    res.status(400).send()
  }
})

router.post("/teachers/logout", auth, async (req, res) => {
  try {
    const { teacher } = req
    teacher.jwt = null
    await teacher.save()
    res.status(200).send({ email: teacher.email, jwt: teacher.jwt })
  } catch (error) {
    console.log("logout error", error)
    res.status(400).send()
  }
})

module.exports = router
