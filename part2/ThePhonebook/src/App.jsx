import { useState } from 'react'

const Filter = ({ type, onChange }) => {
  return (
    <div>
      <h2>Filter by {type}</h2>
      <p>Show people with {type}: <input type='text' onChange={onChange} /></p>
    </div>
  )
}

const NewPersonForm = ({ updatePersons }) => {
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  const hOnChangeName = e => setNewName(e.target.value.trim());
  const hOnChangeNumber = e => setNewNumber(e.target.value.trim());

  const hOnSubmit = event => {
    event.preventDefault();

    if (!newName)
      return alert('Fill Name field please')

    if (!newNumber)
      return alert('Fill Number field please')

    updatePersons({ name: newName, number: newNumber });
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={hOnSubmit}>
        <p>
          <label>Name:</label> <input name="name" type="text" onChange={hOnChangeName} />
        </p>
        <p>
          <label>Number:</label> <input name="number" type='tel' onChange={hOnChangeNumber} />
        </p>
        <button type="submit">Add</button>
      </form>
    </div>
  )


}

const PersonDetails = ({ name, number }) => <li>{name} {number}</li>

const MyList = ({ title, data, filter }) => {

  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {filter == '' ?
          data.map(p => <PersonDetails key={p.id} name={p.name} number={p.number} />) :
          data.filter(p => p.name.toLowerCase().includes(filter)).map(p => <PersonDetails key={p.id} name={p.name} number={p.number} />)
        }
      </ul>
    </div>
  )
}

const App = () => {

  // Variables
  const [persons, setPersons] = useState([
    { id: 1, name: 'Arto Hellas', number: '040-123456' },
    { id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    { id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    { id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);

  const [filter, setFilter] = useState('');

  // Functions
  const hOnChangeFilter = e => setFilter(e.target.value.toLowerCase().trim());
  const updatePersons = newPerson => {

    // Aproach 1
    if (persons.find(e => e.name.toLowerCase() == newPerson.name.toLowerCase()))
      return alert(`${newPerson.name} is already added to phonebook`);

    // Aproach 2
    // if (persons.some(e => e.name.toLowerCase() == newName.toLowerCase()))
    //   return alert(`${newName} is already added to phonebook`);

    setPersons(persons.concat({ id: persons.length + 1, name: newPerson.name, number: newPerson.number }))
  }

  // Return
  return (
    <div>
      <Filter type={'name'} onChange={hOnChangeFilter} />
      <hr />

      <NewPersonForm updatePersons={updatePersons} />
      <hr />

      <MyList title={'Numbers'} data={persons} filter={filter} />
    </div>
  )
}

export default App