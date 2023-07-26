import nc from 'next-connect';
import FormatResponse from 'response-format';
import verifyJwt from '@backend/middleware/verifyJwt';
import messageModal from '@backend/models/messageModal';
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { searchQuery } = req.body;
      const { id } = req.payload;

      const messages = await messageModal.find({
        $and: [
          { $or: [{ userId: id }, { otherUserId: id }] },
          { message: { $regex: `${searchQuery}`, $options: 'i' } },
        ],
      });

      return res
        .status(200)
        .json(FormatResponse.success('searched messages are', messages));
    } catch (error) {
      console.log(error.message);
      return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
  });

export default handler;
