import nc from "next-connect";
import FormatResponse from "response-format";
import chatModal from "../../../models/chatModal";
const handler = nc().post(async (req, res) => {
  try {
    const chatRoom = await chatModal.deleteMany({});
    return res.status(200).json(FormatResponse.success("Success", chatRoom));
  } catch (error) {
    return res.status(400).json(FormatResponse.badRequest(error.message, {}));
  }
});

export default handler;
