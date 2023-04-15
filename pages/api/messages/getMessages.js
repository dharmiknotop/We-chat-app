import nc from 'next-connect';
import FormatResponse from 'response-format';
import verifyJwt from '@backend/middleware/verifyJwt';
import messageModal from '@backend/models/messageModal';
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { chatRoomId } = req.body;

      const messages = await messageModal.find({
        chatRoomId,
      });

      return res
        .status(200)
        .json(FormatResponse.success('Successfully added a message', messages));
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
  });

export default handler;
