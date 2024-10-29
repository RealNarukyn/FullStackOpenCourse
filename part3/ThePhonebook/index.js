require('dotenv').config()

const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/persons.model')
// const path      = require('path')

const app = express()

// * Middlewares
app.use(express.static('dist'))
app.use(cors())
app.use(express.json())

morgan.token('body', (req) => JSON.stringify(req.body))

app.use(morgan((tokens, req, res) => {
  if (req.method === 'POST') {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens['body'](req, res)
    ].join(' ')
  }

  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms'
  ].join(' ')
}))


const errorHandler = (error, request, response) => {
  console.log('Error Name:', error.name)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  }
  else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  return response.status(500).send({ error: error.message || 'invalid request' })
  // next(error)
}


// * [ GET ] Routing

app.get('/api/persons', (request, response, next) => {
  Person.find({})
    .then(res => {
      console.log(res)
      return response.json(res)
    })
  // .catch(err => response.status(500).json({ error: err }))
    .catch(err => next(err))
})

app.get('/api/persons/info', (request, response, next) => {
  Person.find({})
    .then(res => {
      const entryNums = res.length
      const entryTimestamp = new Date().toString()

      const RESPONSE_HTML =
                `
                    <p>Phonebook has info for: ${entryNums} people</p>
                    <p>${entryTimestamp}</p>
                `

      response.send(RESPONSE_HTML)
    })
  //.catch(err => response.json({ error: err }))
    .catch(err => next(err))
})

app.get('/api/persons/:id', (request, response, next) => {
  const { id } = request.params

  Person.findById(id)
    .then(res => {
      if (!res) {
        return next(res)
      }

      response.json(res)
    })
    .catch(err => next(err))
})


// * [ POST ] Routing
app.post('/api/persons', (request, response, next) => {
  const { name, number } = request.body

  Person.find({ name })
    .then(res => {
      if (res.length > 0) {
        return next({ name: 'existing name', message: 'name must be unique' })
      }

      const newPerson = new Person({ name, number })

      newPerson.save()
        .then(p => response.status(201).json(p))
        .catch(err => next(err))
    })
    .catch(err => next(err))
})

// * [ PUT ] Routing
app.put('/api/persons/:id', (request, response, next) => {
  const { id } = request.params
  const { number } = request.body

  // the optional { new: true } parameter,
  // will cause our event handler to be called with
  // the new modified document instead of the original.
  Person.findByIdAndUpdate(id, { number }, { new: true, runValidators: true, context: 'query' })
    .then(res => response.status(200).json(res))
    .catch(err => next(err))
})


// * [ DELETE ] Routing
app.delete('/api/persons/:id', (request, response, next) => {
  const { id } = request.params

  Person.findByIdAndDelete(id)
    .then(() => response.status(204).end())
    .catch(err => next(err))
})


// this has to be the last loaded middleware, also all the routes should be registered before this!
app.use(errorHandler)

// * APP Listening...
const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server listening at PORT: ${PORT}`))