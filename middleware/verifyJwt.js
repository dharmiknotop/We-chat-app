import FormatResponse from 'response-format';
import jwt from 'jsonwebtoken';

const verifyJwt = async (req, res, next) => {
  if (
    req.cookies.token === undefined ||
    req.cookies.token === '' ||
    req.cookies.token === null
  ) {
    console.log(req.cookies);
    return res
      .status(401)
      .json(FormatResponse.badRequest('Unauthorized token doesnot exist', {}));
  }
  try {
    req.payload = jwt.verify(req.cookies.token, process.env.SECRET_KEY);
    next();
  } catch (err) {
    console.log(err);
    return res
      .status(401)
      .json(
        FormatResponse.badRequest('Unauthorized Problem while verifying', {})
      );
  }
};
export default verifyJwt;
