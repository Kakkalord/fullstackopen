const Header = (props) => {
  return (
    <div>
      <h1>Course: {props.course}</h1>
    </div>
  )
}

const Content = (props) => {
  return (
    <div>
      <p>
        <Part part={props.parts[0]} />
        <Part part={props.parts[1]} />
        <Part part={props.parts[2]} />
      </p>
    </div>
  )
}

const Part = (props) => {
  return (
    <div>
      Part: {props.part.name}, Exercises: {props.part.exercises}
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      Total Exercise: {props.parts[0].exercises + props.parts[1].exercises + props.parts[2].exercises}
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
  )
}

export default App