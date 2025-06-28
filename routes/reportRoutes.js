const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createReport, upVote, addComment, getNearbyIssues } = require('../controllers/reportController');

const upload = multer({ storage: multer.memoryStorage() });

router.post('/report', upload.single('image'), createReport);
router.post('/issues', getNearbyIssues);
router.post('/issues/:id/upvote', upVote);
router.post('/issues/:id/comment', addComment);

module.exports = router;
