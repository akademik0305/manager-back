import express from 'express'
import mongoose from 'mongoose';
import cors from 'cors'


// routers
import authRouter from './router/authRouter.js';
import taskRouter from './router/taskRouter.js'

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())
app.use('/auth', authRouter)
app.use('/task', taskRouter)

app.get('/', (req, res) => {
  res.json({
    message: 'server ok'
  })
})

const start = async () => {
  try {
    await mongoose.connect(`mongodb+srv://user:qwerty123@cluster0.bqgxfkh.mongodb.net/?retryWrites=true&w=majority`)
    app.listen(PORT, () => {
      console.log('Server is running on port: ' + PORT)
    })

  } catch (e) {
    console.log(e)
  }
}

start()