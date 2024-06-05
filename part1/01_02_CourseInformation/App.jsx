/*
    I did the second exercise directly at step 1. 
    This is the App.jsx from the exercise one
*/

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
    return <p>Total exercises: {props.total}</p>
  }
  
  const App = () => {
    // Data for <Header />
    const course = 'Half Stack application development';
  
    // Data for <Content />
    /*
      const part1 = 'Fundamentals of React'
      const exercises1 = 10
      const part2 = 'Using props to pass data'
      const exercises2 = 7
      const part3 = 'State of a component'
      const exercises3 = 14
    */
    const elements = [
      { part: 1, title: 'Fundamentals of React',    exercises: 10 },
      { part: 2, title: 'Using props to pass data', exercises: 7 },
      { part: 3, title: 'Fundamentals of React',    exercises: 14 },
    ]
  
    // Data for <Total />
    let totalExercises = 0;
    elements.forEach(e => {
      totalExercises += e.exercises;
    });
  
    return (
      <div>
        <Header course={course} />
  
        {elements.map(e => (<Content key={e.part} part={e.part} title={e.title} exercises={e.exercises}/>))}
        <Total total={totalExercises} />
        
      </div>
    )
  }
  
  export default App