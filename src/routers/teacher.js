const express = require("express")
const crypt = require("bcryptjs")
const { Teacher } = require("../db/db")

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
    res.status(400).send(error)
  }
})

router.post("/teachers/login", async (req, res) => {
  try {
    const { email, password } = req.body
    const teacher = await Teacher.findOne({ email })
    const isMatch = crypt.compare(password, teacher.password)

    if (!isMatch) throw new Error("Invalid login")

    res.status(200).send({ jwt: teacher.jwt })
  } catch (error) {
    res.status(400).send(error)
  }
})
