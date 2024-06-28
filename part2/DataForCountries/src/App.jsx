// * My Imports
import CountriesAPI from './services/CountriesAPI';


// * Extern Imports
import { useEffect, useState } from 'react'


// * Components
const CountryDetails = ({ country, showDetails }) => {
  const StyleButton = { margin: '.5em', backgroundColor: '#747bff' };

  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [ignoreRestriction, setIgnoreRestriction] = useState(false);

  useEffect(() => {
    CountriesAPI.getByName(country)
      .then(res => {
        setCountryData(res.data);
        setLoading(false);
      })
      .catch(error => console.log(error));
  }, [loading])


  const hOnClickShow = () => { 
    setIgnoreRestriction(true);
    setLoading(true);
  }

  // * Returns
  if (!showDetails && !ignoreRestriction) 
    return (
      <li>
        {country}
        <button style={ StyleButton } onClick={hOnClickShow}>Show</button>
      </li>);


  if (loading)
    return;

  return (
    <div>
      <h2>{countryData.name.common}</h2>

      <h3>Capital:</h3>
      <p>{countryData.capital[0]} - {countryData.area}</p>

      <h3>Languages:</h3>
      <ul>
        {Object.keys(countryData.languages).map(key => <li key={key}>{countryData.languages[key]}</li>)}
      </ul>

      <p>
        <img src={countryData.flags.png} alt="country_flag" />
      </p>

      <h2>Weather in {countryData.name.common}</h2>

    </div>
  )
}


const CountryList = ({ countries, filter }) => {
  const [fCountries, setFCountries] = useState([]);

  useEffect(() => {
    if (filter != '') {
      console.log('aplying filter');
      const auxBuff = countries.filter(c => c.includes(filter));
      setFCountries(auxBuff);
    }
  }, [filter])


  // * Returns
  if (fCountries.length < 1) {
    console.log('cl 1');
    return (<p>No country match...</p>)
  }


  if (fCountries.length > 10) {
    console.log('cl 2');
    return (
      <p>Find too many matches, specify another filter</p>
    )
  }

  if (fCountries.length === 1) {
    console.log('cl 3');
    return (
      <CountryDetails country={fCountries[0]} showDetails={true} />
    )
  }

  console.log('cl 4');
  console.log('fCountries.length', fCountries.length)
  return (
    <ul>
      {fCountries.map(c => <CountryDetails key={c} country={c} showDetails={false} />)}
    </ul>
  )
}


// * Main
const App = () => {
  // * Declarations
  const [filter, setFilter] = useState('');
  const [allCountries, setAllCountries] = useState('');
  const [loadingCountries, setLoadingCountries] = useState(true);
  const [filteredCountries, setFilteredCountries] = useState([]);


  // * On Component Mount
  useEffect(() => {
    CountriesAPI.getAll()
      .then(res => {
        const resC = res.data.map(country => country.name.common.toLowerCase());
        setAllCountries(resC);
        setLoadingCountries(false);
      })
      .catch(error => {
        console.log('Error', error);
      })
  }, []);


  // * Functions
  const hOnChangeCountryName = e => setFilter(e.target.value.trim().toLowerCase());


  // * JSX
  return (
    <div>
      <h1> Country Finder</h1>

      <input type='text' onChange={hOnChangeCountryName} placeholder='Country' />

      {loadingCountries ? null :
        <>
          <h2>Country Matches:</h2>
          <CountryList countries={allCountries} filter={filter} />
        </>
      }


    </div>
  )
}

export default App;