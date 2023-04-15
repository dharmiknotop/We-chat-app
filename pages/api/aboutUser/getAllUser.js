import nc from 'next-connect';
import userModal from '@backend/models/userModal';
import FormatResponse from 'response-format';
import verifyJwt from '@backend/middleware/verifyJwt';

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack);
    res.status(500).end('Something broke!');
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found');
  },
})
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { id } = req.payload;

      const allUsers = await userModal.find({
        _id: { $ne: id },
      });

      if (!allUsers) {
        return res
          .status(400)
          .json(FormatResponse.badRequest(`No User Available `, {}));
      }

      return res.status(200).json(FormatResponse.success('Success', allUsers));
    } catch (error) {
      return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
  });

export default handler;
