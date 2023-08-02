import nc from 'next-connect';
import FormatResponse from 'response-format';
import verifyJwt from '@backend/middleware/verifyJwt';
import userModal from '@backend/models/userModal';
import chatModal from '@backend/models/chatModal';
import messageModal from '@backend/models/messageModal';

const handler = nc()
  .use(verifyJwt)
  .get(async (req, res) => {
    try {
      const { id } = req.payload;
      const user = await userModal.findOne({ _id: id });

      if (user) {
        return res.status(200).json(FormatResponse.success('Success', user));
      } else {
        return res
          .status(200)
          .json(FormatResponse.badRequest('User Not Found', {}));
      }
    } catch (error) {
      return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
  });

export default handler;
