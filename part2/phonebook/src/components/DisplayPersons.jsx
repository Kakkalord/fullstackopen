const DisplayPersons = ({persons, removePersons}) => {
    return (
        persons.map(person => 
        <p key={person.id}>
            {person.name} {person.number}   
            <button onClick={() => removePersons(person.id)}>Delete</button> 
        </p>)
    )
}

export default DisplayPersons