import express from 'express'
const app = express()
import dotenv from "dotenv"
dotenv.config()


// db 
import connectDB from './db/connect.js'



// middleware
import notFoundMiddleware from "./middleware/not_found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"


app.use(express.json())

// test route
app.get('/', (req, res) => {
  res.send("welcome to my domain")
})

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.PORT || 5001

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URL)
    app.listen(port, () => {
      console.log(`Server is listening on ${port}`)
    })
  } catch (error) {
    console.log(error)
  }
}

start()
