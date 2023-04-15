import nc from 'next-connect';
import FormatResponse from 'response-format';
import verifyJwt from '@backend/middleware/verifyJwt';
import userModal from '@backend/models/userModal';
import chatModal from '@backend/models/chatModal';
import { db } from '../../../firebaseConfig';
import { addDoc, collection, doc, setDoc } from 'firebase/firestore';
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { id, userName } = req.payload;
      const { otherUserName, otherUserId } = req.body;

      const tempChatRoom = await chatModal.create({ userList: [] });

      const colRef = doc(db, 'chats', tempChatRoom._id.toString());

      const chatRoom = await chatModal.findOneAndUpdate(
        {
          _id: tempChatRoom._id,
        },
        {
          $push: {
            userList: {
              $each: [
                { userName: userName, userId: id },
                { userName: otherUserName, userId: otherUserId },
              ],
            },
          },
        }
      );

      //adding the chat room id in the user's clicked user in userList

      const user = await userModal.findOneAndUpdate(
        { $and: [{ _id: id }, { 'userList.userId': otherUserId }] },
        {
          $set: { 'userList.$.chatRoomId': chatRoom._id },
        }
      );

      //adding the chat room id in the other user's userList

      const theOtherUser = await userModal.findOneAndUpdate(
        { $and: [{ _id: otherUserId }, { 'userList.userId': id }] },

        {
          $set: { 'userList.$.chatRoomId': chatRoom._id },
        }
      );
      setDoc(colRef, {
        messageCount: 0,
        chatRoomId: tempChatRoom._id.toString(),
      }).then(() => {
        console.log('sucess');
      });

      return res.status(200).json(FormatResponse.success('Success', chatRoom));
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
  });

export default handler;
