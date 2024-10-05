const mongoose = require('mongoose')
const bcrypt = require('bcryt')

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: number,
      required: true,
    },
    relationshipStatus: {
      type: String,
      default: 'Not specified'
    },
    friends: {
      type: Array,
      default: [],
    },
    careerStatus: {
      type: String,
      default: 'Not Specified',
    },
    posts: {
      type: Array,
      default: [],
    },
    savedPosts: {
      type: Array,
      default: [],
    }

  }, { timestamps: true }
)

//function provided by MongoDB to check for password before login in 
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();
  try {
    //generating salt for encryption
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }
})


//login route to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
