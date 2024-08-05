import Display from "./DisplayCountry"

const Filter = ({ showCountry, handleFilterChange }) => 
      <>search country: <input value={showCountry} onChange={handleFilterChange}/></>
  

export default Filter