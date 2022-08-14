const express = require('express')

const { register, deleteAllUser } = require('../controllers/registerController')
const { body } = require('express-validator')
const { login } = require('../controllers/loginController')

const customInputValidations = require('../utils/customValidation')
const checkRequestValidationMiddleware = require('../middlewares/checkRequestValidationMiddleware')
const router = express.Router()

router.route('/register').post(
  [
    body('name').custom((val) => {
      const err = customInputValidations.isInputEmpty(val)
      if (err !== '') {
        throw new Error(err)
      }
      return true
    }),
    body('email').custom((val) => {
      const err = customInputValidations.isInputEmpty(val)
      if (err !== '') {
        throw new Error(err)
      }
      return true
    }),
    body('password').custom((val) => {
      const err = customInputValidations.isInputEmpty(val)
      if (err !== '') {
        throw new Error(err)
      }
      return true
    }),
  ],
  checkRequestValidationMiddleware,
  register,
)
router.route('/deleteAll').delete(deleteAllUser)

module.exports = router
