const SearchFilter = ({persons, showFiltered, handleFilterChange}) => {

    // filter for people with same name (case insensitive)
    const filterMatches = persons.filter(person => person.name.toLowerCase().startsWith(showFiltered.toLowerCase()))

    const filteredPeople = (filterMatches.length > 0 && showFiltered != '')
        ? filterMatches
        : ([{name: 'search...'}])

    return (
        <>
            filter: <input value={showFiltered} onChange={handleFilterChange}/>
            {filteredPeople.map(person => 
                <p key={person.name}>{person.name} {person.number}</p>)}
        </>
    )
}

export default SearchFilter