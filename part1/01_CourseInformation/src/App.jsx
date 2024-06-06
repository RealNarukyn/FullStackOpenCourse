import { useEffect, useState } from "react"

const Header = (props) => {
  return <h1>{props.course}</h1>
}

const Content = (props) => {
  return (
    <div>
      <h2>
        Part {props.part < 10 ? '0'+props.part : props.part}: {props.title}
      </h2>
      <p>Number of exercises: {props.exercises}</p>
      <hr/>
    </div>
  )
}

const Total = (props) => {
  const [total, setTotal] = useState(0);

  useEffect( () => {
    let _total = 0;

    props.parts.forEach(e => {
      _total += e.exercises;
    });

    setTotal(_total);
  }, []);

  return <p>Total exercises: {total}</p>
}

const App = () => {
  // Data 
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        part: 1,
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        part: 2, 
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        part: 3,
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />

      {course.parts.map(e => (<Content key={e.part} part={e.part} title={e.title} exercises={e.exercises}/>))}

      <Total parts={course.parts} />
    </div>
  )
}

export default App