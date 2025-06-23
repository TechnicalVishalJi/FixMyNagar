const express = require('express');
const router = express.Router();
const multer = require('multer');
const { createReport, voteReport, addComment, getNearbyIssues } = require('../controllers/reportController');

const upload = multer({ dest: 'uploads/' });

router.post('/report', upload.single('image'), createReport);
router.get('/issues', getNearbyIssues);
router.post('/issues/:id/vote', voteReport);
router.post('/issues/:id/comment', addComment);

module.exports = router;
