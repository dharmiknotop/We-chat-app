import nc from 'next-connect';
import FormatResponse from 'response-format';
import verifyJwt from '@backend/middleware/verifyJwt';
import chatModal from '@backend/models/chatModal';
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { chatRoomId } = req.body;

      const lastMessage = await chatModal.find({
        chatRoomId,
      });

      return res
        .status(200)
        .json(FormatResponse.success('Success', lastMessage));
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
  });

export default handler;
