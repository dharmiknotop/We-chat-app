const userModal = require('../models/userModal')
const encryptPassword = require('../utils/encryptPassword')
const FormatResponse = require('response-format')
const jwt = require('jsonwebtoken')
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

    //generating token

    const token = await jwt.sign({ id: newUser._id }, process.env.SECRET_KEY)

    console.log(token)

    return res.status(200).json(FormatResponse.success('Success', { newUser }))
  } catch (error) {
    return res.status(400).json(FormatResponse.badRequest(error.message, {}))
  }
}

exports.deleteAllUser = async (req, res) => {
  try {
    const deleteAll = await userModal.deleteMany({})

    if (deleteAll) {
      return res
        .status(200)
        .json(FormatResponse.success('Success', { deleteAll }))
    }
  } catch (err) {
    return res.status(400).json(FormatResponse.badRequest(err.message, {}))
  }
}
