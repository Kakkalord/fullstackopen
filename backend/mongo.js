const mongoose = require('mongoose')

if (process.argv.length<3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]

const uri =
  `mongodb+srv://wangc1012097:${password}@fso-cluster.0wzstrv.mongodb.net/?retryWrites=true&w=majority&appName=FSO-Cluster`

mongoose.set('strictQuery',false)

mongoose.connect(uri)

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

// generate new Note
const note = new Note({
  content: 'HTML is easy',
  important: true,
})

note.save().then(result => {
  console.log('note saved!')
  mongoose.connection.close()
})

// find note
Note.find({}).then(result => {
    result.forEach(note => {
        console.log(note)
    })
    mongoose.connection.close()
})
