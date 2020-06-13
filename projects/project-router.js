const express = require("express")
const db = require("../data/helpers/projectModel")

const router = express.Router()
//GET all projects
router.get("/", (req, res) => {
    db
        .get()
        .then(data => {
            res.status(200).json(data)
        })
        .catch((error) => {
            res.status(500).json({ error: "There was an error" })
        })
})
//GET project by ID
router.get("/:id", (req, res) => {
    db
        .get(req.params.id)
        .then((id) => {
            if (id) {
                res.status(200).json(id)
            } else {
                res.status(404).json({
                    message: "Project by that ID not found"
                })
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "There was an error" })
        })
})

// ///GET project actions by project ID
// router.get("/:id/actions", (req, res) => {
//     db
//         .getProjectActions(req.params.id)
//         .then((proj) => {
//             if (!proj.length) {
//                 res.status(400).json({
//                     message: "No actions found for this project"
//                 })
//             } else {
//                 res.status(200).json(project)
//             }
//         })
//         .catch((error) => {
//             res.status(500).json({ error: "There was an error" })
//         })
// })
//POST new project
router.post("/", (req, res) => {
    if (!req.body.name || !req.body.description) {
        res.status(400).json({
            message: "Name and Description fields are required"
        })
    }
    db
        .insert(req.body)
        .then((proj) => {
            if (proj) {
                res.status(201).json({
                    message: "Project Added Successfilly"
                })
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "There was an error" })
        })
})
//PUT (update) project by ID
router.put("/:id", (req, res) => {
    db
        .update(req.params.id, req.body)
        .then((edit) => {
            if (edit) {
                res.status(200).json({
                    message: "Project updated sucessfully"
                })
            } else {
                res.status(404).json({ message: "no project found by that ID" })
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "There was an error" })
        })
})
//DELETE project
router.delete("/:id", (req, res) => {
    db
        .remove(req.params.id)
        .then((proj) => {
            if (proj > 0) {
                res.status(200).json({
                    message: "Project has been deleted"
                })
            } else {
                res.status(404).json({ message: "no project found by that ID" })
            }
        })
        .catch((error) => {
            res.status(500).json({ error: "There was an error" })
        })
})


module.exports = router