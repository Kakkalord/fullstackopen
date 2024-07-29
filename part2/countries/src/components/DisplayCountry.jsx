const Display = ({ countries, showCountry }) => {
  
    if (countries.length > 10 && showCountry!=='') {
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
  
      const languages = countries[0].languages
      const languagesList = Object.values(languages).map(language => (
        <li key={language}>{language}</li>
      ))
  
      return (
        <div>
          <h1>{countries[0].name.common}</h1>
          <p>capital: {countries[0].capital[0]}</p>
          <p>area: {countries[0].area}</p>
          <h2>languages:</h2>
          {languagesList}
          <picture>
            <img src={countries[0].flags.png} width="250" height="150"/>
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