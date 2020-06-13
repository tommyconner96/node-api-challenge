const express = require("express")
const db = require("../data/helpers/actionModel")

const router = express.Router()

// GET action by ID
router.get("/:actionId", (req, res) => {
    db
        .get(req.params.actionId)
        .then((id) => {
            if (id) {
                res.status(200).json(id);
            } else {
                res.status(404).json({
                    message: "That action does not exist."
                })
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "There was an error" })
        })
})

// POST new action
router.post("/", (req, res) => {
    if (
        // !req.params.id ||
        !req.body.description ||
        req.body.description.length > 128
    ) {
        return res.status(400).json({
            message: "Missing fields or description too long"
        })
    }
    db
        .insert(req.body)
        .then((proj) => {
            if (proj) {
                res.status(201).json({
                    message: "Action created successfuly"
                })
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "There was an error" })
        })
})
//DELETE
router.delete("/:actionId", (req, res) => {
    db
      .remove(req.params.actionId)
      .then((action) => {
        if (action > 0) {
          res.status(200).json({
            message: "Action has been removed."
          })
        }
      })
      .catch((error) => {
        res.status(500).json({ error: "There was an error" })
    })
  })

module.exports = router