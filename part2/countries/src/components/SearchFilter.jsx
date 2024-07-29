// const Filter = ({ countries, country, handleFilterChange }) => {
    
//     const returnDisplay =  () => {   return (
//         <>
//             filter countries: <input value={country} onChange={handleFilterChange}/>
//             {filteredCountries.map(country => {
//                 <div>{country.name.common}</div>
//             })}
//         </>
//     )}

//     const filterMatches = countries.filter(country => country.name.common.toLowerCase().startsWith(country))

//     if (filterMatches.length > 10 && country != '') {
//         const filteredCountries = ['too many results...']
//         return returnDisplay
        

//     } else if (filterMatches.length > 1 && filterMatches.length < 10) {
//         const filteredCountries = filterMatches
//         return returnDisplay

//     } else {
//         const filteredCountries=filterMatches[0]
//         return returnDisplay
//     }


// }

// export default Filter