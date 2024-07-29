import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/SearchFilter'


const App = () => {
  const [countries, setCountries] = useState([])
  const [country, setCountry] = useState('')

  const handleFilterChange = (event) => {
    setCountry(event.target.value)
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
      <Filter countries={countries} showCountry={country} handleFilterChange={handleFilterChange}/>
    </>
  )
}

export default App
