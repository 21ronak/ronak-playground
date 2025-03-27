import React, { useState } from "react";
import "./ExpediaSearch.css";

const ExpediaSearch: React.FC = () => {
    const [from, setFrom] = useState("");
    const [to, setTo] = useState("");
    const [departureDate, setDepartureDate] = useState("");
    const [flights, setFlights] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);

    const mockFlights = [
        { airline: "American Airlines", price: "$250", duration: "5h 30m", from, to, date: departureDate },
        { airline: "Delta Airlines", price: "$300", duration: "6h 15m", from, to, date: departureDate },
        { airline: "United Airlines", price: "$280", duration: "5h 50m", from, to, date: departureDate },
    ];

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setFlights(mockFlights); // Simulated API response
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="container">
            <h1>Expedia Flight Search</h1>
            <form className="search-form" onSubmit={handleSearch}>
                <input type="text" placeholder="From" value={from} onChange={(e) => setFrom(e.target.value)} required />
                <input type="text" placeholder="To" value={to} onChange={(e) => setTo(e.target.value)} required />
                <input type="date" value={departureDate} onChange={(e) => setDepartureDate(e.target.value)} required />
                <button type="submit">Search Flights</button>
            </form>

            {loading ? <p>Loading flights...</p> : null}

            <div className="grid-container">
                {flights.map((flight, index) => (
                    <div key={index} className="flight-card">
                        <h3>{flight.airline}</h3>
                        <p>🛫 {flight.from} → 🛬 {flight.to}</p>
                        <p>📅 {flight.date}</p>
                        <p>⏳ {flight.duration}</p>
                        <p className="price">{flight.price}</p>
                        <button className="book-button">Book Now</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpediaSearch;
