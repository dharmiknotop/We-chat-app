const express = require('express')
const { login } = require('../controllers/loginController')
const { body } = require('express-validator')
const customInputValidations = require('../utils/customValidation')
const checkRequestValidationMiddleware = require('../middlewares/checkRequestValidationMiddleware')

const router = express.Router()

router.route('/login').post(
  [
    body('name').custom((val) => {
      const err = customInputValidations.isInputEmpty(val)
      if (err !== '') {
        throw new Error(err)
      }
      return true
    }),
  ],
  checkRequestValidationMiddleware,
  login,
)

module.exports = router
