import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
      <div className="App">
      </div>
      <h1>Home Page</h1>
      <ul>
        <li><Link to="/TodoList">Todo List</Link></li>
        <li><Link to="/UserList">User List</Link></li>
        <li><Link to="/InfiniteScrollImages">InfiniteScrollImages</Link></li>
        <li><Link to="/AirbnbDogUI">AirbnbDogUI</Link></li>
        <li><Link to="/ExpediaSearch">ExpediaSearch</Link></li>
        <li><Link to="/Marketplace">Marketplace</Link></li>
        <li><Link to="/SignupForm">SignupForm</Link></li>
        <li><Link to="/PollApp">PollApp</Link></li>
        <li><Link to="/DoordashDogs">Doordash Dogs</Link></li>
        <li><Link to="/DogsCarousal">My Dogs Carousal</Link></li>
        <li><Link to="/DogsCarousalWithComments">DogsCarousal With Comments</Link></li>
        <li><Link to="/DoordashUI">Doordash UI</Link></li>
        <li><Link to="/DogBreedsList">DogBreedsList</Link></li>
        <li><Link to="/SeatBooking">SeatBooking</Link></li>
        <li><Link to="/PlayerTable">PlayerTableSort</Link></li>
        <li><Link to="/VirtualizedList">VirtualizedList</Link></li>
      </ul>
    </div>
  );
};

export default Home;
