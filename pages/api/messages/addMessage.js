import nc from 'next-connect'
import FormatResponse from 'response-format'
import verifyJwt from '../../../middleware/verifyJwt'
import messageModal from '../../../models/messageModal'
import { db } from '../../../firebaseConfig'
import {
  collection,
  doc,
  increment,
  setDoc,
  updateDoc,
} from 'firebase/firestore'
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { id } = req.payload
      const { chatRoomId, message, userName } = req.body

      console.log(userName)

      const colRef = doc(db, 'chats', chatRoomId.toString())

      const messages = await messageModal.create({
        userId: id,
        userName,
        chatRoomId,
        message,
      })

      updateDoc(colRef, {
        messageCount: increment(1),
      }).then(() => {
        console.log('sucess')
      })

      return res
        .status(200)
        .json(FormatResponse.success('Successfully added a message', messages))
    } catch (error) {
      console.log(error.message)
      return res.status(400).json(FormatResponse.badRequest(error.message, {}))
    }
  })

export default handler
