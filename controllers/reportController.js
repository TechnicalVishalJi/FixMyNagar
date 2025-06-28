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


const Post = require('../models/Report');
const User = require('../models/User');
const cloudinary = require('../config/cloudinary');
const jwt = require('jsonwebtoken');


async function fetchGeoByIp(req) {
  // getting the IP address of the user
  const forwarded = req.headers['x-forwarded-for'];
  const ip = forwarded ? forwarded.split(',')[0] : req.socket.remoteAddress;
  console.log('User IP:', ip);
  try {
    const res = await fetch(`http://ip-api.com/json/${ip}?fields=lat,lon`);
    const data = await res.json();
    console.log('IP geolocation data:', data);
    return { lat: data.lat ? data.lat : 0, lng: data.lon ? data.lon : 0 };
  } catch (err) {
    console.error('IP geolocation failed:', err);
    return null;
  }
}

const uploadToCloudinary = (buffer) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder: 'FixMyNagar/reports',
        resource_type: 'image'
      },
      (error, result) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          reject(error);
        } else {
          resolve({
            imageUrl: result.secure_url,
            publicId: result.public_id
          });
        }
      }
    );
    
    uploadStream.end(buffer);
  });
};

exports.createReport = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  let user;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  try {
    let { lat, lng, address, description} = req.body;
    const file = req.file;

    const { imageUrl, publicId } = await uploadToCloudinary(req.file.buffer);

    if (!imageUrl) return res.status(500).json({ error: 'Image upload failed' });

    if ((!lat || !lng)) {
      const geo = await fetchGeoByIp(req);
      if (geo) {
        lat = geo.lat;
        lng = geo.lng;
      }
    }

    const aiResult = { category: 'pothole', confidence: 0.9 }; 

    await Post.create({
      userName: user.name,
      userEmail: user.email,
      imageUrl: imageUrl,
      category: aiResult.category,
      location: {
        lat: lat,
        lng: lng,
        address: address
      },
      description: description  ? description : aiResult.category,
      votes: [{userEmail: user.email, time: new Date()}],
      status: 'unresolved',
      comments: [],
      timestamp: new Date()
    });

    res.status(201).json({success: true});
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getNearbyIssues = async (req, res) => {
  const token = req.cookies.token;
  let user;
  if (!token){
    user = null; // User not authenticated, treat as anonymous
  }else{
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      user = await User.findById(decoded.id);
      if (!user){
        user = null; // User not found, treat as anonymous
      }
    } catch (err) {
      user = null; // Invalid token, treat as anonymous
    }
  }

  const userEmail = user ? user.email : null;

  const posts = await Post.find({})
    .select('_id userName imageUrl category location.address description votes status comments timestamp')
    .lean();

  const formatted = posts.map((p) => ({
    id: p._id.toString(),
    postUserName: p.userName,
    image: p.imageUrl,
    category: p.category,
    address: p.location.address,
    title: p.description,
    upvotes: p.votes.length,
    isUpvoted: userEmail ? p.votes.some(v => v.userEmail === userEmail) : false,
    status: p.status,
    comments: p.comments,
    timestamp: p.timestamp
  }));

  res.json({ posts: formatted });
};

exports.upVote = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  let user;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { id } = req.params;

  const post = await Post.findById(id);
  if (!post) return res.status(404).json({ error: 'Post not found' });

  const alreadyVoted = post.votes.some(v => v.userEmail === user.email);
  
  if (alreadyVoted) {
    post.votes = post.votes.filter(v => v.userEmail !== user.email);
  } else {
    post.votes.push({ userEmail: user.email, time: new Date() });
  }

  await post.save();

  res.json({
    upvotes: post.votes.length,
    isUpvoted: !alreadyVoted
  });
};

exports.addComment = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  let user;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { id } = req.params;
  const { comment } = req.body;
  if (!comment || comment.trim() === '') return res.status(400).json({ error: 'Comment is required' });

  const newComment = {
    userName: user.name,
    userEmail: user.email,
    comment,
    time: new Date()
  };

  const updated = await Post.findByIdAndUpdate(
    id,
    { $push: { comments: newComment } },
    { new: true }
  ).lean();

  if (!updated) return res.status(404).json({ error: 'Post not found' });

  const safeComments = updated.comments.map(({ userName, comment, time }) => ({
    userName, comment, time
  }));
  res.json({ comments: safeComments });
};