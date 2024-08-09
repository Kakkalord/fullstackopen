const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./model/person')
const person = require('./models/person')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

app.use(express.json())
app.use(morgan('tiny'))
//app.use(morgan(':method :url :body :rest[content-length] - :response-time ms :body'))
app.use(cors())
app.use(express.static('dist'))

let persons = []

const info = (persons) => {
  const now = new Date()
  const currentDateTime = now.toLocaleString()

  return (
    `Phonebook has info for ${persons.length} people
    <p>${currentDateTime}<p>`
  )
}

app.get('/info', (request, response) => {
  response.send(info(persons))
})

const generateRandomId = () => {
  return (
    Math.floor(Math.random() * 1000)
  )
}

app.get('/', (request, response) => {
  response.send('<h1>Hello Clarence!</h1>')
})

// get all persons
app.get('/api/persons', (request, response) => {
  Person.find({}).then(result => {
    response.json(result)
  })
})

// find person by id
app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(result => {
      response.json(result)
    })
})

// save person to database
app.post('/api/persons/:id', (request,response) => {
  const {name, number} = request.body
  
  if (!name || !number) {
    return (response.status(400).json({
      error: 'content missing'
    }))
  }

  // querie DB to find one
  Person.findOne({name: name})
  .then(personExists => {
    if (personExists) {
      return response.status(403).json({
        error: 'person exists already'
      })
    }

    // create new person
    person = new Person({
      name,
      number
    })

    // save person to DB
    person.save()
      .then(savedPerson => {
        response.json(savedPerson)
      })
    }
  )

  app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    notes = persons.filter(person => person.id !== id)
  
    response.status(204).end()
  })  
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})