import nc from 'next-connect'
import userModal from '../../../models/userModal'
import jwt from 'jsonwebtoken'
import FormatResponse from 'response-format'
import { createCookie } from '../../../utils/createCookie'
import bcrypt from 'bcryptjs'

const handler = nc({
  onError: (err, req, res, next) => {
    console.error(err.stack)
    res.status(500).end('Something broke!')
  },
  onNoMatch: (req, res) => {
    res.status(404).end('Page is not found')
  },
}).post(async (req, res) => {
  try {
    const { name, email, password, logoUrl } = req.body
    const { cookies } = req

    // check does user exist in User

    const doesExist = await userModal.findOne({
      email,
    })

    if (doesExist) {
      return res
        .status(400)
        .json(FormatResponse.badRequest(`Email already exists `, {}))
    }
    // encrypting the password

    const encryptedPassword = await bcrypt.hashSync(password, 12)

    // creating the user

    const newUser = await userModal.create({
      name,
      email,
      password: encryptedPassword,
      logoUrl,
    })

    //generating token

    const token = jwt.sign(
      {
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30,
        id: newUser._id,
      },
      process.env.SECRET_KEY,
    )

    createCookie(res, cookies, token)

    return res.status(200).json(FormatResponse.success('Success', newUser))
  } catch (error) {
    return res.status(400).json(FormatResponse.badRequest(error.message, {}))
  }
})

export default handler
