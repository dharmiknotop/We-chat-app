import FormatResponse from 'response-format'
import jwt from 'jsonwebtoken'

const verifyJwt = async (req, res, next) => {
  console.log(req.cookies.token)
  if (
    req.cookies.token === undefined ||
    req.cookies.token === '' ||
    req.cookies.token === null
  ) {
    return res.status(401).json(FormatResponse.badRequest('kya yar', {}))
  }
  try {
    req.payload = jwt.verify(req.cookies.token, process.env.SECRET_KEY)
    // console.log(req.payload)
    next()
  } catch (err) {
    console.log(err)
    return res.status(401).json(FormatResponse.badRequest('unauthodrized', {}))
  }
}
export default verifyJwt
