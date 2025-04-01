import React, { useState, useMemo } from 'react';
import './App.css'; // style separately if needed

const rows = 'ABCDEFGHIJ'.split('');
const cols = Array.from({ length: 10 }, (_, i) => i);

const App = () => {
  // const initialSeats = rows.flatMap((row) =>
  //   cols.map((col) => ({ id: `${row}${col}`, status: 'available' }))
  // );
  const initialSeats = [];

  for (let row of rows) {
    for (let col of cols) {
      initialSeats.push({ id: `${row}${col}`, status: 'available' });
    }
  }

  const [seats, setSeats] = useState(initialSeats);

  const toggleSeat = (id) => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) => {
        if (seat.id !== id) return seat;
        if (seat.status === 'booked') return seat;

        return {
          ...seat,
          status: seat.status === 'available' ? 'selected' : 'available',
        };
      })
    );
  };

  const seatMap = useMemo(() => {
    const map = {};
    seats.forEach((seat) => {
      map[seat.id] = seat;
    });
    return map;
  }, [seats]);

  const SeatButton = React.memo(({ seat, onClick }) => (
    <button
      className={`seat ${seat.status}`}
      onClick={() => onClick(seat.id)}
      disabled={seat.status === 'booked'}
    >
      {seat.id}
    </button>
  ));

  const bookSeats = () => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.status === 'selected' ? { ...seat, status: 'booked' } : seat
      )
    );
  };

  const clearSelection = () => {
    setSeats((prevSeats) =>
      prevSeats.map((seat) =>
        seat.status === 'selected' ? { ...seat, status: 'available' } : seat
      )
    );
  };

  const resetAll = () => {
    setSeats(initialSeats);
  };

  const selectedSeats = useMemo(
    () => seats.filter((s) => s.status === 'selected'),
    [seats]
  );

  const bookedSeats = useMemo(
    () => seats.filter((s) => s.status === 'booked'),
    [seats]
  );

  return (
    <div className="app">
      <div className="seat-grid">
        {rows.map((row) => (
          <div key={row} className="seat-row">
            {cols.map((col) => {
              const id = `${row}${col}`;
              // const seat = seats.find((s) => s.id === id);
              const seat = seatMap[id];
              return <SeatButton key={id} seat={seat} onClick={toggleSeat} />;
            })}
          </div>
        ))}
      </div>

      <div className="status-info">
        <p>Selected: {selectedSeats.length}</p>
        <p>{selectedSeats.map(s => s.id).join(', ') || 'None'}</p>
        <p>Booked: {bookedSeats.length}</p>
        <p>{bookedSeats.map(s => s.id).join(', ') || 'None'}</p>
      </div>

      <div className="controls">
        <button className="btn book" onClick={bookSeats}>Book Seats</button>
        <button className="btn clear" onClick={clearSelection}>Clear</button>
        <button className="btn reset" onClick={resetAll}>Reset Bookings</button>
      </div>
    </div>
  );
};

export default App;
