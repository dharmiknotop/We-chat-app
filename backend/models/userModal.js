const { Schema, model } = require('mongoose')
const { ObjectId } = Schema

const userSchema = new Schema({
  name: {
    type: String,
    maxLength: 150,
    trim: true,
    default: '',
  },
  email: {
    type: String,
    required: [true, 'Please provide an email'],
    unique: true,
    lowercase: true,
    trim: true,
    default: '',
  },
  password: {
    type: String,
    required: [true, 'Please provide password'],
    trim: true,
    default: '',
  },
})

module.exports = model('User', userSchema)
