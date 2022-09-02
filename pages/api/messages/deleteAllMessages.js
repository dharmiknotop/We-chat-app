import nc from 'next-connect'
import FormatResponse from 'response-format'
import messageModal from '../../../models/messageModal'
const handler = nc().post(async (req, res) => {
  try {
    const user = await messageModal.deleteMany({})
    return res.status(200).json(FormatResponse.success('Success', user))
  } catch (error) {
    return res.status(400).json(FormatResponse.badRequest(error.message, {}))
  }
})

export default handler
