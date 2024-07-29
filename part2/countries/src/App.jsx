import { useState, useEffect } from 'react'
import axios from 'axios'
// import Filter from './components/SearchFilter'
// import Display from './components/DisplayCountry'

const Filter = ({ countries, showCountry, handleFilterChange }) => {
  const filterMatches = countries.filter(country => 
    country.name.common.toLowerCase().startsWith(showCountry.toLowerCase()))

  return (
    <>
      search country: <input value={showCountry} onChange={handleFilterChange}/>
      <Display countries={filterMatches}/>
    </>
  )
}


const Display = ({ countries }) => {
  
  if (countries.length > 10) {
    return (
      <div>
        Too many matching searches, please specify other filter...
      </div>
    )
  } else if (countries.length < 10 && countries.length > 1) {
    return (
      countries.map((country) => 
        <div key={country.cca3}> 
          {country.name.common}
        </div>
      )
    )
  } else if (countries.length === 1) {
    return (
      <div>
        {countries[0].name.common}
      </div>
    )
  } else {
    return (
      <div>
        no matches found.
      </div>
    )
  }
}


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
