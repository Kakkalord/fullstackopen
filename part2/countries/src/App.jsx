import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/SearchFilter'
import Display from "./components/DisplayCountry"


const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')

  const filterMatches = countries.filter(countrys => 
    countrys.name.common.toLowerCase().startsWith(country.toLowerCase()))

  const handleFilterChange = (event) => {
    setCountry(event.target.value)
  }

  const handleShowPress = (name) => {
    console.log(`${name} needs to be shown`)
    setCountry(name)
  } 

  useEffect(() => {
    console.log('effect used')
    axios
      .get('https://studies.cs.helsinki.fi/restcountries/api/all')
      .then(response => {
        console.log(response.data)
        setCountries(response.data)
      })
  }, [])

  return (
    <>
      <Filter countries={countries} showCountry={country} handleFilterChange={handleFilterChange} />
      <Display filterCountries={filterMatches} showCountry={country} handleShowPress={handleShowPress}/>
    </>
  )
}

export default App
