import nc from "next-connect";
import FormatResponse from "response-format";
import verifyJwt from "../../../middleware/verifyJwt";
import messageModal from "../../../models/messageModal";
import userModal from "../../../models/userModal";
import { db } from "../../../firebaseConfig";
import { doc, increment, updateDoc } from "firebase/firestore";
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { id } = req.payload;
      const { chatRoomId, message, userName, otherUserId, replyerInfo } =
        req.body;

      const colRef = doc(db, "chats", chatRoomId.toString());

      const messages = await messageModal.create({
        userId: id,
        otherUserId,
        userName,
        chatRoomId,
        message,
        replyerInfo,
      });

      updateDoc(colRef, {
        messageCount: increment(1),
      }).then(() => {
        console.log("sucess");
      });

      //adding the chat room id in the user's clicked user in userList

      const user = await userModal.findOneAndUpdate(
        { $and: [{ _id: id }, { "userList.userId": otherUserId }] },
        {
          $set: { "userList.$.lastMessage": message },
        }
      );

      const theOtherUser = await userModal.findOneAndUpdate(
        { $and: [{ _id: otherUserId }, { "userList.userId": id }] },

        {
          $set: { "userList.$.lastMessage": message },
        }
      );

      return res
        .status(200)
        .json(FormatResponse.success("Successfully added a message", messages));
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
  });

export default handler;
