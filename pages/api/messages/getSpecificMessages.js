import nc from 'next-connect'
import FormatResponse from 'response-format'
import verifyJwt from '../../../middleware/verifyJwt'
import messageModal from '../../../models/messageModal'
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { searchQuery } = req.body

      const messages = await messageModal.find({
        message: { $regex: `${searchQuery}`, $options: 'i' },
      })
      console.log(messages)

      return res
        .status(200)
        .json(FormatResponse.success('searched messages are', messages))
    } catch (error) {
      console.log(error.message)
      return res.status(400).json(FormatResponse.badRequest(error.message, {}))
    }
  })

export default handler
