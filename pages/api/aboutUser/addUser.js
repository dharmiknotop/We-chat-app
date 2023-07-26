import nc from 'next-connect';
import FormatResponse from 'response-format';
import verifyJwt from '@backend/middleware/verifyJwt';
import userModal from '@backend/models/userModal';
const handler = nc()
  .use(verifyJwt)
  .post(async (req, res) => {
    try {
      const { id, userName, userLogo } = req.payload;
      const { otherUserName, otherUserId, otherUserLogo, chatRoomId } =
        req.body;
      //adding the other user in the user's userList
      const user = await userModal.findOneAndUpdate(
        { _id: id },
        {
          $push: {
            userList: {
              userName: otherUserName,
              userId: otherUserId,
              userLogo: otherUserLogo,
            },
          },
        }
      );
      //adding the  user in the other user's userList
      console.log(otherUserId);
      await userModal.findOneAndUpdate(
        { _id: otherUserId },
        {
          $push: {
            userList: { userName, userId: id, userLogo },
          },
        }
      );

      return res.status(200).json(FormatResponse.success('Success', user));
    } catch (error) {
      return res.status(400).json(FormatResponse.badRequest(error.message, {}));
    }
  });

export default handler;
