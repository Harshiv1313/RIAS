const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
  // Extract token from the Authorization header
  const token = req.headers['authorization']?.split(' ')[1]; // Assumes token is sent as 'Bearer <token>'

  if (!token) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded user to the request object
    next();
  } catch (error) {
    res.status(401).json({ message: 'Token is not valid' });
  }
};
