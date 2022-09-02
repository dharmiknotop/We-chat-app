import nc from 'next-connect'
import userModal from '../../../models/userModal'
import jwt from 'jsonwebtoken'
import FormatResponse from 'response-format'
import { createCookie } from '../../../utils/createCookie'
import bcrypt from 'bcryptjs'
import { serialize } from 'cookie'

const handler = nc().post(async (req, res) => {
  try {
    // const { cookies } = req
    // createCookie(res, cookies, '')
    const serialized = serialize('token', null, {
      httpsOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 60 * 60 * 24 * 30,
      path: '/',
    })
    res.setHeader('Set-Cookie', serialized)
    return res.status(200).json(FormatResponse.success('Success', 'logged Out'))
  } catch (error) {
    return res.status(400).json(FormatResponse.badRequest(error.message, {}))
  }
})

export default handler
