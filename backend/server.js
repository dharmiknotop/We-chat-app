const app = require('./app')
const dotenv = require('dotenv')
const connectDatabase = require('./config/database')
dotenv.config({ path: 'backend/config/config.env' })
// connecting to database
connectDatabase()
app.listen(process.env.PORT, () => {
  console.log(`server is working on 300 ${process.env.PORT}`)
})
