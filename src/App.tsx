import React from 'react';
import logo from './logo.svg';
import './App.css';
import UserList from './components/UserList';
import TodoList from './components/todo/TodoList_v2';
import InfiniteScrollImages from './components/InfiniteScroll';
import AirbnbDogUI from './components/AirbnbDogUI';
import ExpediaSearch from './components/expedia/ExpediaSearch';
import Marketplace from './components/Airbnb/Marketplace';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import SignupForm from './components/SignUpForm_reducer';
import PollApp from './components/PollingApp';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        Ronak Playground
      </header>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todoList" element={<TodoList />} />
          <Route path="/UserList" element={<UserList />} />
          <Route path="/InfiniteScrollImages" element={<InfiniteScrollImages />} />
          <Route path="/AirbnbDogUI" element={<AirbnbDogUI />} />
          <Route path="/ExpediaSearch" element={<ExpediaSearch />} />
          <Route path="/Marketplace" element={<Marketplace />} />
          <Route path="/SignupForm" element={<SignupForm />} />
          <Route path="/PollApp" element={<PollApp />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
