const AddPeople = ({ addName, newName, handleNameChange, persons, newNumber, handleNumberChange}) => {
    return (
        <form onSubmit={addName}>
            <div>
                name: <input value={newName} onChange={handleNameChange} persons={persons}/>
            </div>
            <div>
                number: <input value={newNumber} onChange={handleNumberChange} />
            </div>
            <div>
                <button type="submit" >add</button>
            </div>
        </form>
    )
}

export default AddPeople