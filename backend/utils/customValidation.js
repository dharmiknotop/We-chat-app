const isInputEmpty = (input) => {
  if (input === undefined || input === null) {
    return 'Required Field'
  }
  if (input.trim() === '') {
    return 'Required Field'
  }
  return ''
}

module.exports = { isInputEmpty }
