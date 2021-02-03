const express = require("express")

const router = express.Router()

//This route is designed to activate the heroku backend (free tier heroku products are in sleep mode after 15min)
router.get("/wakeup", (req, res) => {
  res.status(200).send({ message: "I am awake" })
})
