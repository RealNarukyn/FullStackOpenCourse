const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('person', personSchema)

const password = process.argv[2]

const connDb = () => {
  const url =
        `mongodb+srv://narukyn:${password}@phonebook.q3p0qbx.mongodb.net/?retryWrites=true&w=majority&appName=PhoneBook`

  mongoose.set('strictQuery', false)

  mongoose.connect(url)
}

// * Get query
if (process.argv.length === 3) {
  connDb()

  Person.find({}).then(result => {
    console.log('phonebook:')
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

const name = process.argv[3]
const number = process.argv[4]
// * Add query
if (process.argv.length === 5) {
  connDb()

  const person = new Person({
    name: name,
    number: number,
  })

  person.save().then(() => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}


// * Exportable functions
export const connectDB = () => {
  mongoose.set('strictQuery', false)

  mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log('DB Conn...'))
}