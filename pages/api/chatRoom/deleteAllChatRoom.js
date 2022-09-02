import nc from 'next-connect'
import FormatResponse from 'response-format'
import chatRoomModal from '../../../models/chatRoomModal'
const handler = nc().post(async (req, res) => {
  try {
    const user = await chatRoomModal.deleteMany({})
    return res.status(200).json(FormatResponse.success('Success', user))
  } catch (error) {
    return res.status(400).json(FormatResponse.badRequest(error.message, {}))
  }
})

export default handler
