import express from 'express'
import cors from 'cors'

const app = express();

app.use(express.json())
app.use(cors())

app.get('/', (request, response) => {
  return response.json({
    message: 'hello word'
  })
})

app.listen(3333, () => console.log('Server is running!'))
