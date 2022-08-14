const userModal = require('../models/userModal')
const encryptPassword = require('../utils/encryptPassword')
const FormatResponse = require('response-format')

exports.register = async (req, res) => {
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

    return res.status(200).json(FormatResponse.success('Sucscess', { newUser }))
  } catch (error) {
    return res.status(400).json(FormatResponse.badRequest(error.message, {}))
  }
}
