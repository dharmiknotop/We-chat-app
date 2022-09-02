import { Schema, model, models } from 'mongoose'
import connectToDatabase from '../utils/connectDb'
const { ObjectId } = Schema

connectToDatabase()

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
  logoUrl: {
    type: String,
    default: '',
  },
  userList: [
    {
      userId: {
        type: ObjectId,
      },

      userName: {
        type: String,
        default: '',
      },
      userLogo: {
        type: String,
        default: '',
      },
      chatRoomId: {
        type: String,
        default: '',
      },
    },
  ],
})

module.exports = models.User || model('User', userSchema)
