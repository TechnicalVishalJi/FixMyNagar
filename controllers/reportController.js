// const Report = require('../models/Report');
// const Comment = require('../models/Comment');
// const cloudinary = require('../config/cloudinary');

// const classifyImage = async (url) => {
//   return { category: 'pothole', confidence: 0.9 };
// };

// exports.createReport = async (req, res) => {
//   try {
//     const file = req.file;
//     const { lat, lng, address, description } = req.body;

//     const result = await cloudinary.uploader.upload(file.path);
//     const aiResult = await classifyImage(result.secure_url);

//     const report = new Report({
//       imageUrl: result.secure_url,
//       publicId: result.public_id,
//       category: aiResult.category,
//       location: { lat, lng, address },
//       description,
//     });

//     await report.save();
//     res.status(201).json(report);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.voteReport = async (req, res) => {
//   const report = await Report.findById(req.params.id);
//   report.votes += 1;
//   await report.save();
//   res.json(report);
// };

// exports.addComment = async (req, res) => {
//   const { text, user } = req.body;
//   const comment = new Comment({ reportId: req.params.id, text, user });
//   await comment.save();

//   await Report.findByIdAndUpdate(req.params.id, { $push: { comments: comment._id } });
//   res.json(comment);
// };

// exports.getNearbyIssues = async (req, res) => {
//   const { lat, lng, radius } = req.query;
//   const reports = await Report.find(); // Later: Add geospatial filtering
//   res.json(reports);
// };




const { fakeReports, idCounterRef } = require('../fakeData');

exports.createReport = async (req, res) => {
  try {
    const { lat, lng, address, description } = req.body;
    const file = req.file;

    const imageUrl = file?.originalname || 'fake_image.jpg';
    const aiResult = { category: 'pothole', confidence: 0.9 }; 

    const newReport = {
      id: idCounterRef.current++,
      imageUrl,
      category: aiResult.category,
      location: {
        lat,
        lng,
        address
      },
      description,
      votes: 0,
      status: 'Pending',
      comments: [],
      timestamp: new Date()
    };

    fakeReports.push(newReport);
    res.status(201).json(newReport);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNearbyIssues = async (req, res) => {
  res.status(200).json(fakeReports);
};

exports.voteReport = async (req, res) => {
  const report = fakeReports.find(r => r.id == req.params.id);
  if (report) {
    report.votes++;
    res.json(report);
  } else {
    res.status(404).json({ message: 'Report not found' });
  }
};

exports.addComment = async (req, res) => {
  const report = fakeReports.find(r => r.id == req.params.id);
  const { text, user } = req.body;

  if (report) {
    const newComment = {
      id: Date.now(),
      text,
      user: user || 'Anonymous',
      timestamp: new Date()
    };
    report.comments.push(newComment);
    res.json(newComment);
  } else {
    res.status(404).json({ message: 'Report not found' });
  }
};




