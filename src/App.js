import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const response = await fetch("/api/movies");

        if (!response.ok) {
          throw new Error("Failed to fetch movies");
        }

        const payload = await response.json();
        setMovies(payload.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    getData();
  }, []);

  if (loading) {
    return (
      <div className="App">
        <h2>Loading movies...</h2>
      </div>
    );
  }

  if (error) {
    return (
      <div className="App">
        <h2>Error: {error}</h2>
      </div>
    );
  }

  return (
    <div className="App">
      <h1>🎬 Movie List</h1>

      <div className="movie-container">
        {movies.map((movie) => (
          <div className="movie-card" key={movie.id}>
            <h2>{movie.title}</h2>

            <p>
              <strong>Original Title:</strong>{" "}
              {movie.original_title}
            </p>

            <p>
              <strong>Release Date:</strong>{" "}
              {movie.release_date}
            </p>

            <p>
              <strong>Runtime:</strong>{" "}
              {movie.runtime} mins
            </p>

            <p>
              <strong>Rating:</strong>{" "}
              {movie.vote_average}
            </p>

            <p>
              <strong>Status:</strong>{" "}
              {movie.status}
            </p>

            <p>
              <strong>Overview:</strong>
            </p>

            <p>{movie.overview}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;