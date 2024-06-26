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
    .catch(error => {
      console.log('Error is:', error);
    });
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
          data.map(p => <PersonDetails key={p.id} name={p.name} number={p.number} id={p.id} deletePerson={deletePerson} />) :
          data.filter(p => p.name.toLowerCase().includes(filter)).map(p => <PersonDetails key={p.id} name={p.name} number={p.number} deletePerson={deletePerson} />)
        }
      </ul>
    </div>
  )
}

const Notification = ({ type, msg }) => {
  if (msg === null) {
    return null
  }

  return (
    <div className={type}>
      {msg}
    </div>
  )
}

const App = () => {
  // State
  const [persons, setPersons] = useState([]);
  const [filter, setFilter] = useState('');
  const [notification, setNotification] = useState(null);

  // On Component Render
  const initHook = () => {
    PeopleService.getAllPeople().then(res => setPersons(res.data));
  };
  useEffect(initHook, []);

  // Functions

  const setTimerToResetNotification = () => {
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  }

  const hOnChangeFilter = e => setFilter(e.target.value.toLowerCase().trim());

  const updatePersons = newPerson => {

    const INewPerson = { name: newPerson.name, number: newPerson.number, id: (persons.length + 1).toString() };

    const PersonFound = persons.find(e => e.name.toLowerCase() == newPerson.name.toLowerCase())
    if (PersonFound) {
      INewPerson.id = PersonFound.id.toString();

      const confirm = window.confirm(`Do you want to UPDATE ${INewPerson.name} number?`)
      if (!confirm)
        return;

      PeopleService.updatePerson(PersonFound.id, INewPerson)
        .then(res => {
          if (res.status != 200) {
            setNotification({ type: 'error', msg: `Error ${res.status} - ${res.statusText}: updating ${PersonFound.name}` });
            setTimerToResetNotification();

            return;
          }

          setNotification({ type: 'success', msg: `Data updated for: ${PersonFound.name}` });
          setTimerToResetNotification();

          PeopleService.getAllPeople()
            .then(res => setPersons(res.data))
        })
        .catch(error => {
          setNotification({ type: 'error', msg: `Information of ${PersonFound.name} has already been removed from server` })
          setTimerToResetNotification();
        });

      return;
    }

    PeopleService.createPerson(INewPerson)
      .then(res => {
        if (res.status != 201) {
          setNotification({ type: 'error', msg: `Error ${res.status} - ${res.statusText}: creating the new person!` });
          setTimerToResetNotification();

          return;
        }

        setPersons(persons.concat(INewPerson))

        setNotification({ type: 'success', msg: `Stored new contact: ${INewPerson.name}` });
        setTimerToResetNotification();
      })
      .catch(error => {
        setNotification({ type: 'error', msg: `Unrecognized error creating new contact...` })
        setTimerToResetNotification();
      });
  }

  const deletePerson = id => setPersons(persons.filter(person => person.id != id));

  // Return
  return (
    <div>
      <Notification type={notification?.type} msg={notification?.msg} />

      <Filter type={'name'} onChange={hOnChangeFilter} />
      <hr />

      <NewPersonForm updatePersons={updatePersons} />
      <hr />

      <MyList title={'Numbers'} data={persons} filter={filter} deletePerson={deletePerson} />
    </div>
  )
}

export default App