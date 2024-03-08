import express from 'express'
import { insertUser, getUser } from './user'
import { createTodo, getTodo, getTodoAndUserDetails } from './todo'
import cors from 'cors'
const app = express()

app.use(express.json())
app.use(cors())

// creating user
app.post('/createUser', async (req: any, res: any) => {
  const username = req.body.username
  const password = req.body.password
  const firstName = req.body.firstName
  const lastName = req.body.lastName

  try {
    const response = await insertUser(username, password, firstName, lastName)
    res
      .status(201)
      .json({ message: 'User created successfully', user: response })
    console.log(response)
  } catch (error) {
    console.error(error)
    res
      .status(500)
      .json({ message: 'Internal server error( cant get details)' })
  }
})

//getting user details
app.get('/detailUser/:username', async (req: any, res: any) => {
  const username = req.params.username
  try {
    const response = await getUser(username)
    res.status(201).json({ message: 'recieved details', details: response })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal server error ' })
  }
})

// creating Todos
app.post('/addtodo', async (req: any, res: any) => {
  const userId = req.body.userId
  const title = req.body.title
  const description = req.body.description
  try {
    const response = await createTodo(userId, title, description)
    res.status(201).json({ message: 'added todo', todo: response })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Api error : cant create todo' })
  }
})

//getting todos

app.get('/getTodo', async (req: any, res: any) => {
  const userId = req.body.userId
  try {
    const response = await getTodo(userId)
    res.status(201).json({
      message: 'retrived todos',
      WebTransportBidirectionalStream: response,
    })
  } catch (err) {
    console.error(err)
    res.status(500).json({ message: 'Api Error : cant get todos' })
  }
})

// Getting todos and User and User detail
app.get('/getTodoandUser', async (req: any, res: any) => {
  const userId = req.body.userId
  try {
    const response = await getTodoAndUserDetails(userId)
    res.status(201).json({
      message: 'retrived todos',
      WebTransportBidirectionalStream: response,
    })
  } catch (err) {
    console.error(err)
    res
      .status(500)
      .json({ message: 'Api Error : cant get todos and user details' })
  }
})

app.listen(3000, () => {
  console.log('server is running on port 3000')
})
