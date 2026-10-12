import MovieGrid from "../components/MovieGrid";
import { useMovieContext } from "../contexts/MovieContext";

function Watchlist() {
  const { movies } = useMovieContext();

return (
    <main className="watchlist-page">
      <div className="watchlist-header">
        <h1>My Watchlist</h1>
      </div>
      { movies.length > 0 ? (
      <MovieGrid movies={movies} />
    ) : (<div className="empty-watchlist">
         <p>Your watchlist is empty.</p> 
         </div>
         )}
    </main>
  );
};

export default Watchlist;