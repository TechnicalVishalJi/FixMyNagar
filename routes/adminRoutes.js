const express = require('express');
const router = express.Router();
const { updateStatus, getAllIssues } = require('../controllers/adminController');

router.get('/issues', getAllIssues);
router.post('/issues/:id/status', updateStatus);

module.exports = router;
