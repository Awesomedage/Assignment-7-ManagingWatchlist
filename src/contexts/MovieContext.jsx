import { createContext, useState, useContext, useEffect } from "react";

const MovieContext = createContext();

export function useMovieContext() {
  const context = useContext(MovieContext);
  if (!context) {
    throw new Error("useMovieContext must be used within a MovieProvider");
  }
  return context;
}

export const MovieProvider = ({ children }) => {
  const [movies, setMovies] = useState(() => {
    const storedMovies = localStorage.getItem("watchlistMovies");
    return storedMovies ? JSON.parse(storedMovies) : [];
  });

  useEffect(() => {
    localStorage.setItem("watchlistMovies", JSON.stringify(movies));
  }, [movies]);

  const addMovie = (movie) => {
    setMovies((prevMovies) => [...prevMovies, movie]);
  }; 

  const removeMovie = (movieId) => {
    setMovies((prevMovies) => prevMovies.filter((movie) => movie.id !== movieId));
  };

  const isInMovieWatchList = (movieId) => {
    return movies.some((movie) => movie.id === movieId);
  };

const value = {
    movies,
    addMovie,
    removeMovie,
    isInMovieWatchList,
  };

  return (
    <MovieContext.Provider value={value}>
      {children}
    </MovieContext.Provider>
  );
};