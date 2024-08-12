const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
require('dotenv').config()

const Person = require('./model/person')
const person = require('./models/person')
const { nextTick } = require('process')

morgan.token('body', req => {
  return JSON.stringify(req.body)
})

// error handler middleware

const errorHandler = (error, request, reponse, next) => {
  console.log(error)

  if (error.name === 'CastError') {
    return express.response.status(400).send({error: 'Malformed syntax'})
  } else if (error.name === 'ValidationError') {
    return express.response.status(400).json({error: error.message})
  }

  next (error)
}

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
app.post('/api/persons/', (request,response) => {
  const {name, number} = request.body
  
  // check valid post request
  if (!name || !number) {
    return (response.status(400).json({
      error: 'content missing'
    }))
  }

  // check if person exists
  Person.findOne({ name: name })
    .then(personExists => {

    // if person exists, update phone number
    // ???HELP - how do i update someone's number. I should be using put instead of post right?
    if (personExists) {
      personExists.number = number  
      personExists.save()
        .then(savedPerson => { 
          response.json(savedPerson)
        })
    } else {
      // create new person
      const person = new Person({
        name,
        number
      })
  
      // save person to DB
      person.save()
        .then(savedPerson => {
          response.json(savedPerson)
        })
        .catch(error => next(error))
      }
  })

  // update person's number. 
  app.put('/api/person/:id', (request, response, next) => {
    const { name, number } = request.body
  
    Person.findByIdAndUpdate(
      request.params.id, 
      { name, number },
      { new: true, runValidators: true, context: 'query' }
    ) 
      .then(updatedPerson => {
        response.json(updatedPerson)
      })
      .catch(error => next(error))
  })


  // delete person from db
  app.delete('/api/persons/:id', (request, response) => {
    Person.findByIdAndDelete(request.params.id)
      .then(noteToDelete => {
        response.status(204).end()
      })
      .catch(error => next(error))
  })  
})

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})