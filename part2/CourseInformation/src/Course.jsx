const Header = ({ name }) => <h2>{name}</h2>

const Content = ({ part, name, exercises }) => {
  return (
    <div>
      <h3>
        Part {part < 10 ? '0' + part : part}: {name}
      </h3>
      <p>Number of exercises: {exercises}</p>
    </div>
  )
}

const Total = ({ total }) => <p><b>Total exercises: </b>{total}</p>

const Course = ({ course }) => {

  const total = course.parts.reduce((acc, {exercises}) => acc + exercises, 0);

  return (
    <div>
      <Header name={course.name} />

      {course.parts.map(e => (<Content key={e.id} part={e.id} name={e.name} exercises={e.exercises} />))}

      <Total total={total} />

      <hr />
    </div>
  )
}

export default Course;