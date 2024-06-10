import { useState } from 'react'

const App = () => {

  // Variables
  const [persons, setPersons] = useState([
    {id: 1, name: 'Arto Hellas', number: '040-123456' },
    {id: 2, name: 'Ada Lovelace', number: '39-44-5323523' },
    {id: 3, name: 'Dan Abramov', number: '12-43-234345' },
    {id: 4, name: 'Mary Poppendieck', number: '39-23-6423122' }
  ]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');

  // Functions
  const hOnChangeName = e => setNewName(e.target.value);
  const hOnChangeNumber = e => setNewNumber(e.target.value);

  const hOnSubmit = event => {
    event.preventDefault();

    if (!newName)
      return alert('Fill Name field please')

    if (!newNumber)
      return alert('Fill Number field please')

    // Aproach 1
    if (persons.find(e => e.name.toLowerCase() == newName.toLowerCase()))
      return alert(`${newName} is already added to phonebook`);

    // Aproach 2
    // if (persons.some(e => e.name.toLowerCase() == newName.toLowerCase()))
    //   return alert(`${newName} is already added to phonebook`);

    setPersons(persons.concat({ id: persons.length + 1, name: newName, number: newNumber }));
  }

  // Return
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

      <h2>Numbers</h2>
      <ul>
        {persons.map((person, i) => <li key={i}>{person.name} {person.number}</li>)}
      </ul>
    </div>
  )
}

export default App