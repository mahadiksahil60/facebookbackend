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
    }

  }, { timestamps: true }
)

//hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  const user = this;
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt();
    user.password = await bcrypt.hash(user.password, salt);
    next();
  } catch (error) {
    return next(error);
  }

})


//compare this password to hashed password in the database -- > defining this method here so that it can be used in 
//login route to compare passwords
userSchema.methods.comparePassword = async function(password) {
  return bcrypt.compare(password, this.password);
}

const User = mongoose.model('User', userSchema);

module.exports = User;
