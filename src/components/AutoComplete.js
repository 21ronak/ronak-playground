import React from 'react'

const AutoComplete = () => {
  const [search, setSearch] = React.useState('');
  const [searchResults, setSearchResults] = React.useState([]);
  const [error, setError] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');

  const fetchSearchResults = React.useCallback(async (query='') => {
    try {
      const response = await fetch(`https://autocomplete.clearbit.com/v1/companies/suggest?query=${query}`);
      const data = await response.json();
      setSearchResults(data);
      setError(false);
    } catch(e) {
      setError(true);
      setErrorMessage(e.message);
      console.log('Error:', e.message);
    }
  }, [search]);

  React.useEffect(() => {
    const input = search.trim();
    if(input.length) {
      fetchSearchResults(input);
    }
  }, [search]);

  if(error) return (<h4>Error: {errorMessage}</h4>);

  return (
    <div>
      <label htmlFor='autocomplete'>Enter search: </label>
      <input
        type='text'
        name='autocomplete'
        placeholder='Search'
        value={search}
        onChange={(e) => setSearch(e.target.value)}>
      </input>
      <div>
        <SearchResult results={searchResults} />
      </div>
    </div>
  )
};

const SearchResult = ({results}) => {
  if(results.length === 0) return (<p>No items yet</p>);
  console.log(results);
  return (
    <ul>
      {results && results.map((item, index) => (
        <li key={`${item.name}-${index}`}>
          {item.name}
        </li>
      ))}
    </ul>
  );
};

export default AutoComplete
