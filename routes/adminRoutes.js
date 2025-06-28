const express = require('express');
const router = express.Router();
const { updateStatus, getAllIssues, authMe } = require('../controllers/adminController');

router.post('/issues', getAllIssues);
router.post('/issues/:id/status', updateStatus);
router.post('/auth/me', authMe);

module.exports = router;
