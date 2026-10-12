import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import './App.css';
import { useState } from 'react';
import { searchMovies } from './services/movieService';
import { MovieProvider } from './contexts/MovieContext';
import Watchlist from './pages/Watchlist';

function App() {
  const [searchResults, setMovies] = useState(null);

  const handleSearch = async (query) => {
    const results = await searchMovies(query);
    setMovies(results);
  };

  return (
    <MovieProvider>
    <Router>
      <div className="app">
        <Header onSearch={handleSearch} />
        <Routes>
          <Route path="/" element={<Home searchResults={searchResults} />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/Watchlist" element={<Watchlist />} />
        </Routes>
      </div>
    </Router>
    </MovieProvider>
  );
};

export default App;