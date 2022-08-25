import express from 'express'
import cors from 'cors'
const app = express()
import dotenv from "dotenv"
dotenv.config()
import 'express-async-errors'
import morgan from 'morgan'

// db 
import connectDB from './db/connect.js'

//routers
import authRouter from './routes/authRoutes.js'

// middleware
import notFoundMiddleware from "./middleware/not_found.js"
import errorHandlerMiddleware from "./middleware/error-handler.js"


app.use(cors())
app.use(express.json())

// test route
app.get('/', (req, res) => {
  res.send("welcome to my domain")
})

app.use('/api/auth', authRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

if(process.env.NODE_ENV !== 'production'){
  app.use(morgan('dev'))
}

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
