import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchFilter from './components/SearchFilter'
import AddPeople from './components/AddNewPersonsForm'
import DisplayPersons from './components/DisplayPersons'
import phonebookService from './services/phonebook'
import Notification from './components/Notification'

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFiltered, setShowFiltered] = useState('')
  const [message, setMessage] = useState(null)

  // Add person to db
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
    // create new object to hold the person
    const personObject = {
      name: newName,
      number: newNumber,
    }

    // check if person present
    if (persons.some(person => person.name === newName)) { 

      // if true, check if they want to update number
      if (confirm(`${personObject.name} is already added to the phonebook, replace the number?`)) {
        
        const person = persons.find(p => p.name === newName)

        phonebookService
          .update(person.id, personObject)
          .then(returnedPerson => {
            setPersons(persons.map(p => p.id !== person.id ? p : returnedPerson))
            setNewNumber('')
            setNewName('')
        })

      setMessage(`${person.name}'s number updated successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
      }

    } else {
      // add person to db 
      phonebookService
      .create(personObject)
      .then(returnedPerson => {
        console.log(returnedPerson)
        setPersons(persons.concat(returnedPerson))
        setNewNumber('')
        setNewName('')
      })
      setMessage(`${newName} added successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  // remove person from phonebook
  const removePersons = (id) => {
    const removePerson = persons.find(person => person.id === id)

    // remove person
    if (removePerson && confirm(`Delete ${removePerson.name}`)) {
      console.log(removePerson)
      console.log(removePerson.id)

      phonebookService
      .remove(removePerson.id)
      .then(updatedPersons => {
        setPersons(updatedPersons)
        console.log(removePerson.name, ' removed from list')
      })
      setMessage(`${removePerson.name} removed successfully`)
      setTimeout(() => {
        setMessage(null)
      }, 3000)
    }
  }

  const handleNameChange = (event) => {setNewName(event.target.value)}

  const handleNumberChange = (eventNumber) => {setNewNumber(eventNumber.target.value)}

  const handleFilterChange = (eventFilter) => {setShowFiltered(eventFilter.target.value)}

  //fetch db.json
  useEffect(() => {
    console.log('use effect ran')
    axios
      .get('http://localhost:3001/persons')
      .then(response => {
        console.log(response.data, 'promise fulfilled')
        setPersons(response.data)
      })
  }, [])
  console.log('render', persons.length, 'persons')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} />
      <SearchFilter persons={persons} showFiltered={showFiltered} handleFilterChange={handleFilterChange}/>
      
      <h2>Add a new</h2>
      <AddPeople key={persons.length + 1}
        addName={addName} newName={newName} handleNameChange={handleNameChange} persons={persons} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <DisplayPersons persons={persons} removePersons={removePersons}/>
    </div>
  )
}

export default App