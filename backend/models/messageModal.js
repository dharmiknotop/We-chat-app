import { Schema, model, models } from 'mongoose';
import connectToDatabase from '../utils/connectDb';
const { ObjectId } = Schema;

connectToDatabase();

const userSchema = new Schema({
  userId: {
    type: ObjectId,
    default: '',
  },

  otherUserId: {
    type: ObjectId,
    default: '',
  },

  userName: {
    type: String,
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

  replyerInfo: [
    {
      replyerId: {
        type: String,
        default: '',
      },
      replyerName: {
        type: String,
        default: '',
      },
      replyerMessage: {
        type: String,
        default: '',
      },
    },
  ],

  // createdAt: {
  //   type: String,
  // },
});

module.exports = models.Messages || model('Messages', userSchema);
