import React, { useEffect, useState, useMemo } from 'react';

const DogBreedsList = () => {
  const [breeds, setBreeds] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState({}); // Stores expanded state by breed

  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const res = await fetch('https://dog.ceo/api/breeds/list/all');
        if (!res.ok) throw new Error(`HTTP error: ${res.status}`);
        const data = await res.json();
        setBreeds(data.message);
      } catch (err) {
        console.error(err);
        setError('Failed to load dog breeds.');
      } finally {
        setLoading(false);
      }
    };

    fetchBreeds();
  }, []);

  const filteredBreeds = useMemo(() => {
    if (!search.trim()) return breeds;

    const lowerSearch = search.toLowerCase();
    const filtered = {};

    for (const [breed, subBreeds] of Object.entries(breeds)) {
      if (breed.includes(lowerSearch)) {
        filtered[breed] = subBreeds;
      } else {
        const matchedSubs = subBreeds.filter((sub) => sub.includes(lowerSearch));
        if (matchedSubs.length > 0) {
          filtered[breed] = matchedSubs;
        }
      }
    }

    return filtered;
  }, [search, breeds]);

  const toggleExpand = (breed) => {
    setExpanded((prev) => ({
      ...prev,
      [breed]: !prev[breed],
    }));
  };

  const renderBreeds = useMemo(() => {
    return Object.entries(filteredBreeds).map(([breed, subBreeds]) => (
      <li key={breed} style={{ marginBottom: '8px' }}>
        <span
          onClick={() => toggleExpand(breed)}
          style={{
            cursor: subBreeds.length > 0 ? 'pointer' : 'default',
            fontWeight: 'bold',
            userSelect: 'none',
          }}
        >
          {breed} {subBreeds.length > 0 && (expanded[breed] ? '▲' : '▼')}
        </span>
        {subBreeds.length > 0 && expanded[breed] && (
          <ul style={{ marginLeft: '16px', marginTop: '4px' }}>
            {subBreeds.map((sub) => (
              <li key={sub}>{sub}</li>
            ))}
          </ul>
        )}
      </li>
    ));
  }, [filteredBreeds, expanded]);

  return (
    <div>
      <h3 className="task-title">Task 2:</h3>
      <h4 className="task-instructions">
        Instructions: Please get a list of dogs by breed, put it into an unordered list.
      </h4>
      <div className="task-text">
        API Docs:{' '}
        <a
          href="https://dog.ceo/dog-api/documentation"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://dog.ceo/dog-api/documentation
        </a>
      </div>
      <div className="task-text">Data source: https://dog.ceo/api/breeds/list/all</div>

      <input
        type="text"
        placeholder="Search breeds..."
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        style={{ margin: '16px 0', padding: '8px', width: '100%' }}
      />

      {loading ? (
        <p className="task-text">Loading...</p>
      ) : error ? (
        <p className="task-text">Error: {error}</p>
      ) : (
        <ul>{renderBreeds}</ul>
      )}
    </div>
  );
};

export default DogBreedsList;
