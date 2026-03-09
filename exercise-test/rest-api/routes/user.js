const express = require('express');
const router = express.Router();

router.get("/", (req, res) => {
    res.send("Message From backend");
});

router.post("/", (req, res) => {
    res.json(
        {
            message: "Create Seccess",
            data: [
                req.body
            ]
        }
    )
});

router.put("/:id", (req, res) => {
    res.send("Your user update id is " + req.params.id);
});

router.delete("/:id", (req, res) => {
    res.send("Your user delete id is " + req.params.id);
});

module.exports = router;