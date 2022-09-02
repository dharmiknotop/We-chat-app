import nc from 'next-connect'
import FormatResponse from 'response-format'
import verifyJwt from '../../../middleware/verifyJwt'
import userModal from '../../../models/userModal'
import chatModal from '../../../models/chatModal'
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { id, userName } = req.payload
      const { otherUserName, otherUserId } = req.body

      const tempChatRoom = await chatModal.create({ userList: [] })

      console.log(tempChatRoom)

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
        },
      )

      //adding the chat room id in the user's clicked user in userList

      const user = await userModal.findOneAndUpdate(
        { $and: [{ _id: id }, { 'userList.userId': otherUserId }] },
        {
          $set: { 'userList.$.chatRoomId': chatRoom._id },
        },
      )

      console.log(user)

      //adding the chat room id in the other user's userList

      const theOtherUser = await userModal.findOneAndUpdate(
        { $and: [{ _id: otherUserId }, { 'userList.userId': id }] },

        {
          $set: { 'userList.$.chatRoomId': chatRoom._id },
        },
      )

      console.log(theOtherUser)

      return res.status(200).json(FormatResponse.success('Success', chatRoom))
    } catch (error) {
      console.log(error.message)
      return res.status(400).json(FormatResponse.badRequest(error.message, {}))
    }
  })

export default handler
