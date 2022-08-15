import mongoose from 'mongoose'

function connectToDatabase() {
  mongoose
    .connect(process.env.DATABASE_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log('connected successfully')
    })
}
export default connectToDatabase
