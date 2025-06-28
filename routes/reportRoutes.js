const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createReport, upVote, addComment, getNearbyIssues } = require('../controllers/reportController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/report', upload.single('image'), createReport);
router.post('/issues', getNearbyIssues);
router.post('/issues/:id/upvote', upVote);
router.post('/issues/:id/comment', addComment);
router.get('/cron', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>FixMyNagar - Cron Job</title>
            </head>
            <body>
                <h1>Cron job executed successfully!</h1>
            </body>
        </html>
    `);
});

module.exports = router;
