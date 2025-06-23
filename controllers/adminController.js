// const Report = require('../models/Report');

// exports.getAllIssues = async (req, res) => {
//   const issues = await Report.find();
//   res.json(issues);
// };

// exports.updateStatus = async (req, res) => {
//   const { status } = req.body;
//   const report = await Report.findByIdAndUpdate(req.params.id, { status }, { new: true });
//   res.json(report);
// };





const { fakeReports } = require('../fakeData');

// GET all issues (admin view)
exports.getAllIssues = (req, res) => {
  try {
    res.status(200).json(fakeReports);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch issues' });
  }
};

// POST to update status of a specific report
exports.updateStatus = (req, res) => {
  try {
    const reportId = parseInt(req.params.id);
    const { status } = req.body;

    const report = fakeReports.find(r => r.id === reportId);

    if (!report) {
      return res.status(404).json({ message: 'Report not found' });
    }

    if (!status || typeof status !== 'string') {
      return res.status(400).json({ message: 'Invalid or missing status' });
    }

    report.status = status;
    res.status(200).json({ message: 'Status updated', report });
  } catch (err) {
    res.status(500).json({ error: 'Failed to update status' });
  }
};

