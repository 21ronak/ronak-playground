import React, { useState, useMemo } from 'react';

const AllPlayerTableData = [
  { id: "12345", name: "gabatorix", score: 45 },
  { id: "12346", name: "ninja", score: 85 },
  { id: "12347", name: "spooner", score: 15 },
  { id: "12348", name: "sillygirl", score: 20 },
  { id: "12349", name: "astro", score: 0 },
  { id: "12350", name: "giantess", score: 99 },
];

function PlayerTable({ showRankColumn = true }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');

  // Compute ranking based on score (top three get "1st", "2nd", "3rd")
  const rankMapping = useMemo(() => {
    const sortedByScore = [...AllPlayerTableData].sort((a, b) => b.score - a.score);
    let mapping = {};
    sortedByScore.forEach((player, index) => {
      if (index === 0) mapping[player.id] = "1st";
      else if (index === 1) mapping[player.id] = "2nd";
      else if (index === 2) mapping[player.id] = "3rd";
      else mapping[player.id] = "";
    });
    return mapping;
  }, []);

  // Filter data based on the search term (case-insensitive, checks all fields)
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return AllPlayerTableData;
    const lowerSearch = searchTerm.toLowerCase();
    return AllPlayerTableData.filter(player => {
      // Create an array of fields to search in
      const fields = [player.id, player.name, player.score, rankMapping[player.id]];
      return fields.some(field => String(field).toLowerCase().includes(lowerSearch));
    });
  }, [searchTerm, rankMapping]);

  const sortedData = useMemo(() => {
    if (!sortField) return filteredData;
    const data = [...filteredData];
    data.sort((a, b) => {
      let aValue, bValue;
      if (sortField === 'rank') {
        aValue = rankMapping[a.id] ? parseInt(rankMapping[a.id]) : Infinity;
        bValue = rankMapping[b.id] ? parseInt(rankMapping[b.id]) : Infinity;
      } else {
        aValue = a[sortField];
        bValue = b[sortField];
      }

      // Convert to lower case if strings
      if (typeof aValue === 'string') aValue = aValue.toLowerCase();
      if (typeof bValue === 'string') bValue = bValue.toLowerCase();

      if (aValue < bValue) return sortDirection === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortDirection === 'asc' ? 1 : -1;
      return 0;
    });
    return data;
  }, [filteredData, sortField, sortDirection, rankMapping]);

  const handleSort = (field, direction) => {
    setSortField(field);
    setSortDirection(direction);
  };

  return (
    <div>
      {/* Search bar */}
      <div style={{ marginBottom: '30px' }}>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button>Search</button>
      </div>

      {/* Player data table */}
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
        <table border="1" cellPadding="5">
          <thead>
            <tr>
              <th>
                <button onClick={() => handleSort('id', 'desc')}>↓</button>
                ID
                <button onClick={() => handleSort('id', 'asc')}>↑</button>
              </th>
              <th>
                <button onClick={() => handleSort('name', 'desc')}>↓</button>
                Name
                <button onClick={() => handleSort('name', 'asc')}>↑</button>
              </th>
              <th>
                <button onClick={() => handleSort('score', 'desc')}>↓</button>
                Score
                <button onClick={() => handleSort('score', 'asc')}>↑</button>
              </th>
              {showRankColumn && (
                <th>
                  <button onClick={() => handleSort('rank', 'desc')}>↓</button>
                  Rank
                  <button onClick={() => handleSort('rank', 'asc')}>↑</button>
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {sortedData.map(player => (
              <tr key={player.id}>
                <td>{player.id}</td>
                <td>{player.name}</td>
                <td>{player.score}</td>
                {showRankColumn && <td>{rankMapping[player.id]}</td>}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PlayerTable;
