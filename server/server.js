const express = require("express");
const path = require("path");

const app = express();

// Load movies data
const movies = require("./movies_metadata.json");

// Test route
app.get("/api/ping", (request, response) => {
  console.log("❇️ Received GET request to /api/ping");
  response.send("pong!");
});

// Get all movies
app.get("/api/movies", (request, response) => {
  console.log("❇️ Received GET request to /api/movies");

  response.json({
    data: movies
  });
});

// Get movie by ID
app.get("/api/movies/:id", (request, response) => {
  console.log(
    `❇️ Received GET request to /api/movies/${request.params.id}`
  );

  const movie = movies.find(
    movie => String(movie.id) === request.params.id
  );

  if (!movie) {
    return response.status(404).json({
      message: "Movie not found"
    });
  }

  response.json(movie);
});

// Express port-switching logic
let port;

console.log("❇️ NODE_ENV is", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  port = process.env.PORT || 3000;

  app.use(express.static(path.join(__dirname, "../build")));

  app.get("*", (request, response) => {
    response.sendFile(
      path.join(__dirname, "../build", "index.html")
    );
  });
} else {
  port = 3001;

  console.log("⚠️ Not seeing your changes as you develop?");
  console.log(
    "⚠️ Do you need to set 'start': 'npm run development' in package.json?"
  );
}

// Start server
const listener = app.listen(port, () => {
  console.log(
    "❇️ Express server is running on port",
    listener.address().port
  );
});