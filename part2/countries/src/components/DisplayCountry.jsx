const Display = ({ filterCountries, showCountry, handleShowPress }) => {
  
    if (filterCountries.length > 10 && showCountry!=='') {
      return (
        <div>
          Too many matching searches, please specify other filter...
        </div>
      )
    } else if (filterCountries.length < 10 && filterCountries.length > 1) {
      return (
        filterCountries.map((country) => 
          <div key={country.name.common}> 
            {country.name.common}
            <button onClick={() => handleShowPress(country.name.common)}>show</button>
          </div>
        )
      )
    } else if (filterCountries.length === 1) {
  
      const languages = filterCountries[0].languages
      const languagesList = Object.values(languages).map(language => (
        <li key={language}>{language}</li>
      ))
  
      return (
        <div>
          <h1>{filterCountries[0].name.common}</h1>
          <p>capital: {filterCountries[0].capital[0]}</p>
          <p>area: {filterCountries[0].area}</p>
          <h2>languages:</h2>
          {languagesList}
          <picture>
            <img src={filterCountries[0].flags.png} width="250" height="150"/>
          </picture>
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

export default Display