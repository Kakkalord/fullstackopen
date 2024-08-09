const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri = `mongodb+srv://wangc1012097:${password}@fso-cluster.0wzstrv.mongodb.net/?retryWrites=true&w=majority&appName=FSO-Cluster`

mongoose.set('strictQuery', false)

mongoose.connect(uri)
    .then(() => {
        console.log('Mongo DB connected successfully...')})
    .catch((err) => {
        console.log('Error connecting to MongoDB', err.message)
    })

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

// mongo model
const Person = mongoose.model('Person', personSchema)

// return all entries in DB or insert person
if (process.argv.length == 3) {
    console.log('phonebook: \n')
    Person.find({})
        .then(result => {
            result.forEach(person => {
                console.log(`${person.name} ${person.number}`)
            })
        mongoose.connection.close()
    })
} else if (process.argv.length == 5) {
    const person = new Person({
        name: process.argv[3],
        number: process.argv[4]
    })

    person.save()
        .then(result => {
            console.log(`added ${person.name} number ${person.number} to phonebook`)
            mongoose.connection.close()
    })
}

