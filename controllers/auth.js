const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const User = require('../models/User')

//controller for registering a user
const register = async (req, res, next) => {
  const { username, password, email, age } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword, age });
    await user.save();
    res.json({ message: 'Registration Successful' });
  } catch (error) {
    next(error);
  }
}

//Controller for logging in for existing user
const login = async function(req, res, next) {
  const { username, password } = req.body;
  try {
    //Checking if the user exists or not
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User with this username does not exists' })
    }

    //Matching the password
    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: 'Password Entered is wrong.. Please try again' });
    }

    //Creating token for login session
    const token = jwt.sign({ userId: user._id }, '44775688', {
      expiresIn: '24 hour',
    });

    return res.json({ token });
  } catch (error) {
    next(error);
  }
}
  

module.exports = { register, login };
