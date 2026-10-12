import { useState, useEffect } from 'react';
function MovieCard({ movie }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    setIsFavorite(favorites.some(fav => fav.id === movie.id));
  }, [movie.id]);

  const toggleFavorite = () => {
    const favorites = JSON.parse(localStorage.getItem('favoriteMovies')) || [];
    const isCurrentlyFavorite = favorites.some(fav => fav.id === movie.id);

    if (isCurrentlyFavorite) {
      const updatedFavorites = favorites.filter(fav => fav.id !== movie.id);
      localStorage.setItem('favoriteMovies', JSON.stringify(updatedFavorites));
    } else {

      favorites.push(movie);
      localStorage.setItem('favoriteMovies', 
        JSON.stringify(favorites));
      setIsFavorite(true);
    }
  };

  return (
    <div className="movie-card">
      <div className="movie-poster">
        <img 
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
        />
      </div>
      <div className="movie-info">
        <h3 className="movie-title">{movie.title}</h3>
        <div className="movie-details">
          <span className="movie-rating">⭐ {movie.vote_average}</span>
          <span className="movie-year">{movie.release_date.substring(0, 4)}</span>
        </div>
        <button className={`favorite-button ${isFavorite ? 'favorited' : ''}`} onClick={toggleFavorite}>
          {isFavorite ? '♡ Remove from Favorites' : '♡ Add to Favorites'}
        </button>
      </div>
    </div>
  );
};

export default MovieCard;