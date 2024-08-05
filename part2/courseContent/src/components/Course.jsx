const Header = ({ name }) => {
  return (
    <h1>{name}</h1>
  )
}

const Total = ({ parts }) => {
  var totalAmount = parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <b>total of {totalAmount} exercises</b>
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
      <Total parts={course.parts} />
    </div>
  )}
  
export default Course
