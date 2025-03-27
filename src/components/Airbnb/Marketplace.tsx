import React, { useState, useEffect, useCallback, useMemo } from "react";
import "./styles.css";

interface Venue {
  id: number;
  name: string;
  location: string;
  price_per_night: number;
  image: string;
}

const venuesData = [
  {
    "id": 1,
    "name": "Cozy Apartment in Manhattan",
    "location": "New York, USA",
    "price_per_night": 120,
    "rating": 4.8,
    "image": "https://source.unsplash.com/400x300/?apartment,cozy",
    "amenities": ["WiFi", "Kitchen", "Air Conditioning"]
  },

  {
    "id": 2,
    "name": "Luxury Condo with City View",
    "location": "Brooklyn, New York, USA",
    "price_per_night": 200,
    "rating": 4.7,
    "image": "https://source.unsplash.com/400x300/?luxury,condo",
    "amenities": ["WiFi", "Kitchen", "Gym", "Smart TV", "24/7 Security"]
  },
  {
    "id": 3,
    "name": "Budget-Friendly Studio",
    "location": "Queens, New York, USA",
    "price_per_night": 85,
    "rating": 4.5,
    "image": "https://source.unsplash.com/400x300/?studio,apartment",
    "amenities": ["WiFi", "Workspace", "Heating", "Shared Laundry"]
  },
  {
    "id": 4,
    "name": "Historic Brownstone Loft",
    "location": "Harlem, New York, USA",
    "price_per_night": 150,
    "rating": 4.9,
    "image": "https://source.unsplash.com/400x300/?brownstone,loft",
    "amenities": ["WiFi", "Kitchen", "Balcony", "Washer/Dryer"]
  },
  {
    "id": 5,
    "name": "Beachfront Getaway",
    "location": "Coney Island, New York, USA",
    "price_per_night": 220,
    "rating": 4.8,
    "image": "https://source.unsplash.com/400x300/?beach,house",
    "amenities": ["WiFi", "Private Beach Access", "BBQ Grill", "Ocean View"]
  },
  {
    "id": 6,
    "name": "Skyline Penthouse with Rooftop",
    "location": "Midtown, New York, USA",
    "price_per_night": 350,
    "rating": 5.0,
    "image": "https://source.unsplash.com/400x300/?penthouse,rooftop",
    "amenities": ["WiFi", "Hot Tub", "Private Rooftop", "Gym", "Fireplace"]
  },
  {
    "id": 7,
    "name": "Charming Townhouse",
    "location": "Upper West Side, New York, USA",
    "price_per_night": 180,
    "rating": 4.7,
    "image": "https://source.unsplash.com/400x300/?townhouse",
    "amenities": ["WiFi", "Full Kitchen", "Family Friendly", "Backyard"]
  },
  {
    "id": 8,
    "name": "Minimalist Loft near Central Park",
    "location": "Central Park, New York, USA",
    "price_per_night": 275,
    "rating": 4.9,
    "image": "https://source.unsplash.com/400x300/?loft,minimalist",
    "amenities": ["WiFi", "Luxury Interior", "Smart Home", "Fitness Center"]
  },
  {
    "id": 9,
    "name": "Quiet Escape in the City",
    "location": "Greenwich Village, New York, USA",
    "price_per_night": 190,
    "rating": 4.6,
    "image": "https://source.unsplash.com/400x300/?apartment,quiet",
    "amenities": ["WiFi", "Cozy Fireplace", "Bookshelf", "Workspace"]
  },
  {
    "id": 10,
    "name": "Bohemian Artist Loft",
    "location": "Williamsburg, Brooklyn, New York, USA",
    "price_per_night": 210,
    "rating": 4.8,
    "image": "https://source.unsplash.com/400x300/?artist,loft",
    "amenities": ["WiFi", "Inspiring Decor", "Large Windows", "Pet-Friendly"]
  },{
    "id": 11,
    "name": "Beachfront Villa in Malibu",
    "location": "Malibu, USA",
    "price_per_night": 450,
    "rating": 4.9,
    "image": "https://source.unsplash.com/400x300/?beach,house",
    "amenities": ["Pool", "Ocean View", "BBQ Grill"]
  },
]


const Marketplace: React.FC = () => {
  const [venues, setVenues] = useState<Venue[]>([]);
  //const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch("https://api.example.com/venues");
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: Venue[] = await response.json();
        setVenues(data);
        //setFilteredVenues(venuesData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchVenues();
  }, []);

  // const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   const query = event.target.value.toLowerCase();
  //   setSearch(query);
  //   const filtered = venuesData.filter((venue) =>
  //     venue.name.toLowerCase().includes(query) ||
  //     venue.location.toLowerCase().includes(query)
  //   );
  //   setFilteredVenues(filtered);
  // };

  const handleSearch = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(event.target.value.toLowerCase());
  }, []);

  const filteredVenues = useMemo(() => {
    return venuesData.filter(
      (venue) =>
        venue.name.toLowerCase().includes(search) ||
        venue.location.toLowerCase().includes(search)
    );
  }, [search, venues]);

  return (
    <div className="container">
      <h1 className="title">Team Retreat Venues</h1>
      <input
        type="text"
        placeholder="Search by name or location"
        value={search}
        onChange={handleSearch}
        className="search-input"
        aria-label="Search for venues"
      />
      <div className="grid">
        {filteredVenues.map((venue) => (
          <div key={venue.id} className="card">
            <img src={venue.image} alt={venue.name} className="card-image" />
            <div className="card-content">
              <h2 className="card-title">{venue.name}</h2>
              <p className="card-location">{venue.location}</p>
              <p className="card-price">${venue.price_per_night}/night</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Marketplace;
