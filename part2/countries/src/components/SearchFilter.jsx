import Display from "./DisplayCountry"

const Filter = ({ countries, showCountry, handleFilterChange }) => {
    const filterMatches = countries.filter(country => 
      country.name.common.toLowerCase().startsWith(showCountry.toLowerCase()))
  
    return (
      <>
        search country: <input value={showCountry} onChange={handleFilterChange}/>
        <Display countries={filterMatches} showCountry={showCountry}/>
      </>
    )
  }
  

export default Filter