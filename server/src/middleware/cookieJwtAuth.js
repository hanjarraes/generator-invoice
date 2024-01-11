const jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
  const tokenHeader = req.headers.authorization;
  if (!tokenHeader) {
    return res.status(401).json({ message: 'Token not provided' });
  }
  try {
    const tokenParts = tokenHeader.split(' ');
    const token = tokenParts[1];

    const decoded = jwt.verify(token, process.env.MY_SECRET);
    req.decoded = decoded;
    next();
  } catch (err) {
    console.log('ini err', err);
    return res.status(403).json({ message: 'Failed to authenticate token' });
  }
};