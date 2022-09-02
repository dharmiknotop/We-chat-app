import nc from 'next-connect'
import FormatResponse from 'response-format'
import verifyJwt from '../../../middleware/verifyJwt'
import messageModal from '../../../models/messageModal'
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { id } = req.payload
      const { chatRoomId, message } = req.body

      const messages = await messageModal.create({
        userId: id,
        chatRoomId,
        message,
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
