import nc from 'next-connect'
import FormatResponse from 'response-format'
import verifyJwt from '../../../middleware/verifyJwt'
import userModal from '../../../models/userModal'
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { id } = req.payload
      const { name, _id } = req.body
      const user = await userModal.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            userList: { name, _id },
          },
        },
      )
      return res.status(200).json(FormatResponse.success('Success', user))
    } catch (error) {
      return res.status(400).json(FormatResponse.badRequest(error.message, {}))
    }
  })

export default handler
