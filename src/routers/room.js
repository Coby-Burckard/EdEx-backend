const express = require("express")
const { Room } = require("../db/db")
const auth = require("../middleware/auth")

const router = express.Router()

router.post("/room", auth, async (req, res) => {
  try {
    const room = await Room.create({
      scores: [],
      TeacherId: req.teacher.id,
      uuid: "",
      name: req.body.name,
    })
    res
      .status(201)
      .send({ uuid: room.uuid, scores: room.scores, name: room.name })
  } catch (error) {
    console.log(error)
    res.status(400).send("unable to create room")
  }
})

router.patch("/room/:uuid", auth, async (req, res) => {
  try {
    const uuid = req.params.uuid
    const score = req.body.score
    let room

    //finding matching room
    req.teacher.Rooms.forEach((rm) => {
      console.log(rm.uuid, uuid)
      if (rm.uuid === uuid) {
        room = rm
      }
    })

    //validating room and score
    if (!room) {
      throw new Error("unable to find room")
    }

    if (typeof score !== "number") {
      throw new Error("Invalid score")
    }

    room.scores = [...room.scores, score]
    await room.save()

    res
      .status(200)
      .send({ scores: room.scores, uuid: req.params.uuid, name: room.name })
  } catch (error) {
    res.status(400).send("unable to add data to room")
  }
})

//FIX-ME: dry with patch /room/:uuid
router.delete("/room/:uuid", auth, async (req, res) => {
  try {
    const uuid = req.params.uuid
    let room
    req.teacher.Rooms.forEach((rm) => {
      console.log(rm.uuid, uuid)
      if (rm.uuid === uuid) {
        room = rm
      }
    })

    if (!room) {
      throw new Error("unable to find room")
    }

    await room.destroy()

    res.status(200).send({ uuid })
  } catch (error) {
    console.log(error)
    res.status(400).send("unable to find room")
  }
})

module.exports = router
