import React, { useState, useMemo } from "react";

const candidates = ["Alice", "Bob", "Charlie"];

export default function PollApp() {
  const [votes, setVotes] = useState(
    candidates.reduce((acc, name) => ({ ...acc, [name]: 0 }), {})
  );

  const handleVote = (name) => {
    setVotes((prev) => ({ ...prev, [name]: prev[name] + 1 }));
  };

  const stats = useMemo(() => {
    const entries = Object.entries(votes);
    const sorted = [...entries].sort((a, b) => b[1] - a[1]);
    const [leader, second] = sorted;
    return {
      leader: leader ? leader[0] : null,
      voteDiff: leader && second ? leader[1] - second[1] : 0,
      totalVotes: entries.reduce((sum, [, count]) => sum + count, 0),
    };
  }, [votes]);

  return (
    <div className="p-4 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Polling App</h1>
      <PollOptionList votes={votes} onVote={handleVote} />
      <PollStats stats={stats} />
    </div>
  );
}

function PollOptionList({ votes, onVote }) {
  return (
    <div className="space-y-2 mb-6">
      {Object.entries(votes).map(([name, count]) => (
        <PollOption key={name} name={name} count={count} onVote={onVote} />
      ))}
    </div>
  );
}

function PollOption({ name, count, onVote }) {
  return (
    <div className="flex justify-between items-center bg-gray-100 p-3 rounded-lg shadow">
      <span className="font-medium">{name}</span>
      <div className="flex items-center gap-4">
        <span>{count} votes</span>
        <button
          onClick={() => onVote(name)}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Vote
        </button>
      </div>
    </div>
  );
}

function PollStats({ stats }) {
  return (
    <div className="bg-white p-4 rounded shadow-md">
      <h2 className="text-xl font-semibold mb-2">Stats</h2>
      <p><strong>Total Votes:</strong> {stats.totalVotes}</p>
      {stats.leader && (
        <>
          <p><strong>Leader:</strong> {stats.leader}</p>
          <p><strong>Vote Difference:</strong> {stats.voteDiff}</p>
        </>
      )}
    </div>
  );
}
