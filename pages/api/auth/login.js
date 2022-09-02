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
    const { email, password } = req.body
    const { cookies } = req

    // check does user exist in User

    const isValidUser = await userModal.findOne({
      email,
    })

    if (!isValidUser) {
      return res
        .status(400)
        .json(FormatResponse.badRequest(`Invalid email or password `, {}))
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isValidUser.password,
    )

    if (!isPasswordCorrect) {
      return res.status(400).json({
        message: 'Incorrect email or password',
      })
    }

    const token = jwt.sign(
      {
        id: isValidUser._id,
        userName: isValidUser.name,
        userLogo: isValidUser.logoUrl,
      },
      process.env.SECRET_KEY,
    )

    console.log(token)
    createCookie(res, cookies, token)

    return res.status(200).json(FormatResponse.success('Success', isValidUser))
  } catch (error) {
    return res.status(400).json(FormatResponse.badRequest(error.message, {}))
  }
})

export default handler
