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

const Post = require('../models/Report');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

// GET all issues (admin view)
exports.getAllIssues = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  let user;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const admins = process.env.ADMIN_EMAILS.split(',').map(email => email.trim());
    if (!admins.includes(user.email)) {
      return res.status(403).json({ error: 'Access denied' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const userEmail = user.email;
 
  const posts = await Post.find({})
    .select('_id userName imageUrl category location description votes status comments timestamp')
    .lean();

  const formatted = posts.map((p) => ({
    id: p._id.toString(),
    postUserName: p.userName,
    image: p.imageUrl,
    category: p.category,
    address: p.location.address,
    location: {lat: p.location.lat, lng: p.location.lng},
    title: p.description,
    upvotes: p.votes.length,
    isUpvoted: userEmail ? p.votes.some(v => v.userEmail === userEmail) : false,
    status: p.status,
    comments: p.comments,
    timestamp: p.timestamp
  }));

  res.json({ posts: formatted });
};

// POST to update status of a specific report
exports.updateStatus = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  let user;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    const admins = process.env.ADMIN_EMAILS.split(',').map(email => email.trim());
    if (!admins.includes(user.email)) {
      return res.status(403).json({ error: 'Access denied' });
    }
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }

  const { id } = req.params
  const { status } = req.body

  if (!["resolved", "unresolved"].includes(status)) {
    return res.status(400).json({ error: "Invalid status value" })
  }

  try {
    const post = await Post.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    )

    if (!post) {
      return res.status(404).json({ error: "Post not found" })
    }

    res.json({ message: "Status updated", status: post.status })
  } catch (err) {
    console.error(err)
    res.status(500).json({ error: "Server error" })
  }
};

exports.authMe = async (req, res) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ error: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(200).json({ error: 'User not found' });
    const admins = process.env.ADMIN_EMAILS.split(',').map(email => email.trim());
    res.json({ user: { id: user._id, name: user.name, email: user.email }, admin: admins.includes(user.email) });
  } catch (err) {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
