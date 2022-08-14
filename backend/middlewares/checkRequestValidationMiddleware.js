/* eslint-disable no-else-return */
const FormatResponse = require('response-format')
const { validationResult } = require('express-validator')

const checkRequestValidationMiddleware = (req, res, next) => {
  const result = validationResult(req)
  if (!result.isEmpty()) {
    const tempResponse = FormatResponse.badRequest('Please enter all fields.', {
      result,
    })
    return res.status(tempResponse.statusCode).json(tempResponse)
  } else {
    next()
  }
}

module.exports = checkRequestValidationMiddleware
