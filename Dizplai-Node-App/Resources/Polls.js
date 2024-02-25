const express = require('express');
const router = express.Router();

let polls = [
    {
        "pollId": 1,
        "pollName": "Premier League Winner",
        "question": "Who will win the Premier League?",
        "options": [
            {
                "optionId": 1,
                "optionText": "Manchester City",
            },
            {
                "optionId": 2,
                "optionText": "Arsenal",
            },
            {
                "optionId": 3,
                "optionText": "Liverpool",
            }
        ]
    },
    {
        "pollId": 2,
        "pollName": "Premier League 2nd",
        "question": "Who will come second in the Premier League?",
        "options": [
            {
                "optionId": 1,
                "optionText": "Manchester City",
            }
        ]
    }
];

router.get('/:id', (req, res) => {
    const { id } = req.params;
    // ID Validation 400
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json({ message: "Invalid ID integer" });
    }

    const poll = polls.find(poll => poll.pollId == id);

    // Poll location 404
    if (!poll) {
        res.status(404).json({ message: "Poll not found" });
    }
    res.json(poll);
});

router.get('/', (req, res) => {
    res.json(polls);
});

module.exports = router;