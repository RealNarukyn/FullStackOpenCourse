import PeopleService from './services/persons'

import { useEffect, useState } from 'react'

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

const PersonDetails = ({ name, number, id, deletePerson }) => {
  const hDelete = () => {
    const confirm = window.confirm(`Do you really want to DELETE: ${name}?`);
    if (!confirm)
      return;
      
    PeopleService.deletePerson(id).then(res => {
      if (res.status != 200)
        return alert(`Error ${res.status}-${res.statusText}: deleting user ${id}`);

      deletePerson(id);
    })
  }

  return (
    <li>
      <p>
        <b>{name}:</b> {number}
        <button onClick={hDelete}>Delete</button>
      </p>
    </li>
  )
}

const MyList = ({ title, data, filter, deletePerson }) => {
  return (
    <div>
      <h2>{title}</h2>
      <ul>
        {filter == '' ?
          data.map(p => <PersonDetails key={p.id} name={p.name} number={p.number} id={p.id} deletePerson={deletePerson}/>) :
          data.filter(p => p.name.toLowerCase().includes(filter)).map(p => <PersonDetails key={p.id} name={p.name} number={p.number} deletePerson={deletePerson} />)
        }
      </ul>
    </div>
  )
}

const App = () => {
  // State
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');

  // On Component Render
  const initHook = () => {
    PeopleService.getAllPeople().then(res => setPersons(res.data));
  };
  useEffect(initHook, []);

  // Functions
  const hOnChangeFilter = e => setFilter(e.target.value.toLowerCase().trim());

  const updatePersons = newPerson => {
    
    const INewPerson = { name: newPerson.name, number: newPerson.number, id: persons.length + 1 };

    const PersonFound = persons.find(e => e.name.toLowerCase() == newPerson.name.toLowerCase())
    if (PersonFound)
    {
      INewPerson.id = PersonFound.id;

      const confirm = window.confirm(`Do you want to UPDATE ${INewPerson.name} number?`)
      if (!confirm)
        return;

      PeopleService.updatePerson(PersonFound.id, INewPerson)
        .then(res => {
          if (res.status != 200)
            return alert(`Error ${res.status} - ${res.statusText}: updating ${PersonFound.name}`)

          PeopleService.getAllPeople()
            .then(res => setPersons(res.data))
        });

      return;
    }
    
    PeopleService.createPerson(INewPerson)
      .then(res => {
        if (res.status != 201)
          return alert(`Error ${res.status} - ${res.statusText}: creating the new person!`);

        setPersons(persons.concat(INewPerson))
      });
  }
  const deletePerson = id => setPersons( persons.filter(person => person.id != id));

  // Return
  return (
    <div>
      <Filter type={'name'} onChange={hOnChangeFilter} />
      <hr />

      <NewPersonForm updatePersons={updatePersons} />
      <hr />

      <MyList title={'Numbers'} data={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App