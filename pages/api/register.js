import nc from 'next-connect'
import connectToDatabase from '../../utils/connectDb'
import userModal from '../../models/userModal'
import encryptPassword from '../../utils/encryptPassword'
import jwt from 'jsonwebtoken'
import FormatResponse from 'response-format'

connectToDatabase()
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
    const { name, email, password } = req.body

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

    const encryptedPassword = await encryptPassword(password)

    // creating the user

    const newUser = await userModal.create({
      name,
      email,
      password: encryptedPassword,
    })

    //generating token

    const token = await jwt.sign({ id: newUser._id }, process.env.SECRET_KEY)

    console.log(token)

    return res.status(200).json(FormatResponse.success('Success', { newUser }))
  } catch (error) {
    return res.status(400).json(FormatResponse.badRequest(error.message, {}))
  }
})

export default handler
