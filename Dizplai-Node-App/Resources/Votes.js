const express = require('express');
const router = express.Router();

let pollresults = [
    {
        "pollId": 1,
        "pollName": "Premier League Winner",
        "question": "Who will win the Premier League?",
        "options": [
            {
                "optionId": 1,
                "optionText": "Manchester City",
                "tally": 0
            },
            {
                "optionId": 2,
                "optionText": "Arsenal",
                "tally": 0
            },
            {
                "optionId": 3,
                "optionText": "Liverpool",
                "tally": 0
            }
        ]
    },
    {
        "pollId": 2,
        "pollName": "Premier League second",
        "question": "Who will come second in the Premier League?",
        "options": [
            {
                "optionId": 1,
                "optionText": "Manchester City",
                "tally": 0
            }
        ]
    }
]


router.get('/:id', (req, res) => {
    const { id } = req.params;

    // Input Validation 400
    if (!Number.isInteger(parseInt(id))) {
        return res.status(400).json({ message: "Invalid ID integer" });
    }

    // 404 not found
    const poll = pollresults.find(poll => poll.pollId == id);
        if (!poll) {
            res.status(404).json({ message: "Poll not found" });
        }
    // 200 success
        res.json(poll);        
});

router.post('/:id', (req, res) => {
    const { id } = req.params;
    const { optionId } = req.body;

    try {
    // Int Validation 400
        if (!Number.isInteger(parseInt(id)) || !Number.isInteger(parseInt(optionId))) {
        return res.status(400).json({ message: "Invalid ID integer" });
    }

    // Poll location 404
    const pollResult = pollresults.find(result => result.pollId == id);
    if (!pollResult) {
        return res.status(404).json({ message: 'Poll result not found' });
    }

    // Option 404
    const option = pollResult.options.find(opt => opt.optionId == optionId);
        if (!option) {
        console.log(optionId)
        return res.status(404).json({ message: 'Invalid option ID'});
    }

    // add 1 to tally
    option.tally++;

    res.json({ message: 'Vote successful', option, pollresults });
   } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
}



});

module.exports = router;
