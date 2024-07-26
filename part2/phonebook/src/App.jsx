import { useState, useEffect } from 'react'
import axios from 'axios'
import SearchFilter from './components/SearchFilter'
import AddPeople from './components/AddNewPersonsForm'
import DisplayPersons from './components/DisplayPersons'

const App = () => {
  // const [persons, setPersons] = useState([
  //   { name: 'Arto Hellas', number: '0411 222 333', id: 1}
  // ]) 
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [showFiltered, setShowFiltered] = useState('')

  // when form submitted
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
    // create new object to hold the person
    const personObject = {
      name: newName,
      number: newNumber,
      id: persons.length + 1
    }

    // check if name is already present
    if (persons.some(person => person.name === newName)) { 
      alert(`${newName} is already added to phonebook`)
    } else {
      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
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
      <SearchFilter persons={persons} showFiltered={showFiltered} handleFilterChange={handleFilterChange}/>
      
      <h2>Add a new</h2>
      <AddPeople key={persons.length + 1}
        addName={addName} newName={newName} handleNameChange={handleNameChange} persons={persons} 
        newNumber={newNumber} handleNumberChange={handleNumberChange} />
      
      <h2>Numbers</h2>
      <DisplayPersons persons={persons}/>
    </div>
  )
}

export default App