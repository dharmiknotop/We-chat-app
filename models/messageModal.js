import { Schema, model, models } from 'mongoose'
import connectToDatabase from '../utils/connectDb'
const { ObjectId } = Schema

connectToDatabase()

const userSchema = new Schema({
  userId: {
    type: ObjectId,
    default: '',
  },
  chatRoomId: {
    type: ObjectId,
    default: '',
  },
  message: {
    type: String,
    default: '',
  },
})

module.exports = models.Messages || model('Messages', userSchema)
