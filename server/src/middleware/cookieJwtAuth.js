const jwt = require("jsonwebtoken");

exports.cookieJwtAuth = (req, res, next) => {
  const token = req.cookies.token;
  try {
    if (!token) {
      throw new Error('Token is missing');
    }
    const user = jwt.verify(token, process.env.MY_SECRET);
    req.user = user;
    next();
  } catch (err) {
    res.clearCookie("token");
    return res.status(401).json({ error: 'Unauthorized: ' + err.message });
  }
};