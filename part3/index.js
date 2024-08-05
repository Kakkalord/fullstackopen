const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan('tiny'))
//app.use(morgan(':method :url :body :rest[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

let persons = [
  { 
    "id": "1",
    "name": "Arto Hellas", 
    "number": "040-123456"
  },
  { 
    "id": "2",
    "name": "Ada Lovelace", 
    "number": "39-44-5323523"
  },
  { 
    "id": "3",
    "name": "Dan Abramov", 
    "number": "12-43-234345"
  },
  { 
    "id": "4",
    "name": "Mary Poppendieck", 
    "number": "39-23-6423122"
  }
]


const info = (persons) => {
  const now = new Date()
  const currentDateTime = now.toLocaleString()

  return (
    `Phonebook has info for ${persons.length} people
    <p>${currentDateTime}<p>`
  )
}

const generateRandomId = () => {
  return (
    Math.floor(Math.random() * 1000)
  )
}

app.get('/', (request, response) => {
  response.send('<h1>Hello Clarence!</h1>')
})

app.get('/api/persons', (request, response) => {
  response.json(persons)
})

app.get('/info', (request, response) => {
  response.send(info(persons))
})

app.get('/api/persons/:id', (request, response) => {
  const id = request.params.id
  const person = persons.find(person => person.id === id)

  if (person) {
    response.json(person)
  } else {
    response.status(404).end()
  }
})

app.delete('/api/persons/:id', (request, response) => {
  const id = request.params.id
  notes = persons.filter(person => person.id !== id)

  response.status(204).end()
})

app.post('/api/persons/:id', (request,response) => {
  const body = request.body
  
  if (!body.content || !body.name || !body.number) {
    return (response.status(400).json({
      error: 'content missing'
    }))
  } else if (persons.some(person => person.name === body.name)) {
    return (response.status(403).json({
      error: 'person exists already'
    }))
  }

  const person = {
    id: generateRandomId,
    name: body.name,
    number: body.number,
  }

  persons = persons.concat(person)

  response.json(note)

})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})