const mongoose = require('mongoose')

const connectToDatabase = () => {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected successfully')
    })
}
module.exports = connectToDatabase
