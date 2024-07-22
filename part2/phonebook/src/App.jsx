import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas',
      number: '0411 222 333'}
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [personExists, setShowFiltered] = useState('')

  // when form submitted
  const addName = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    
    // create new object to hold the person
    const personObject = {
      name: newName,
      number: newNumber
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

  const personToShow = (persons.some(person => person.name === personExists))
    ? persons.filter(person => person.name === personExists)[0]
    : ({name: 'search...', number: 0})

  // handle changes made to event.target (input)
  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  // handle changes made to event
  const handleNumberChange = (eventNumber) => {
    console.log(eventNumber.target.value)
    setNewNumber(eventNumber.target.value)
  }

  const handleFilterChange = (eventFilter) => {
    console.log(eventFilter.target.value)
    setShowFiltered(eventFilter.target.value)

  }

  return (
    <div>
      <h2>Phonebook</h2>
        <div>
          filter: <input value={personExists} onChange={handleFilterChange}/>
          <div>{personToShow.name} {personToShow.number}</div>
        </div>
      <h2>add a new</h2>
      <form onSubmit={addName}>
        <div>
          name: <input value={newName} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <div>
        {persons.map(person => <p key={person.name}>{person.name} {person.number}</p>)}
      </div>
    </div>
  )
}

export default App