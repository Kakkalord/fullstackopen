const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Content = ({ parts }) => {
  return (
    <ul>
      {parts.map(part => 
        <Part key={part.id} name={part.name} exercises={part.exercises}/>
      )}
    </ul>
  )
}

const Part = ({ name, exercises }) => {
  return (
    <li>{name} {exercises}</li>
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
    </div>
  )}
  
export default Course

//  <ul>
//  {notes.map(note => <Note key={note.id} note={note} />)}
// </ul>