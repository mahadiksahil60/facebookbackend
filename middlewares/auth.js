const jwt = require('jsonwebtoken')
const User = require('../models/User')

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  //try and catch block for verifying the jwt token
  try {
    const decodedToken = jwt.verify(token, '44775688');
    const user = await User.findById(decodedToken.userId);
    if (!user) { 
      return res.status(404).json({ message: 'User not found' }); 
    }
    req.user = user;
    next(); 
  } catch (err) {
    return res.status(401).json({ message: 'Invalid Token' });
  }
}

module.exports = { authenticate }
