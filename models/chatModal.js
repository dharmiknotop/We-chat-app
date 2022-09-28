import { Schema, model, models } from "mongoose";
import connectToDatabase from "../utils/connectDb";
const { ObjectId } = Schema;

connectToDatabase();

const userSchema = new Schema({
  userList: [
    {
      userId: {
        type: ObjectId,
      },
      userName: {
        type: String,
        default: "",
      },
    },
  ],
  lastMessage: {
    type: String,
    default: "",
  },
});

module.exports = models.ChatRoom || model("ChatRoom", userSchema);
