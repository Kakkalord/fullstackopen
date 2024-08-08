const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri =
  `mongodb+srv://wangc1012097:${password}@fso-cluster.0wzstrv.mongodb.net/?retryWrites=true&w=majority&appName=FSO-Cluster`

mongoose.set('strictQuery',false)

mongoose.connect(uri).then(console.log('Mongo DB connected successfully...'))

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: 'Anna',
    number: '040-1234556',
})

person.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})