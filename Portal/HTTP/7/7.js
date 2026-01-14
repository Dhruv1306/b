const express = require("express");
const app = express();
const fs = require("fs");
app.listen(3000, () => {
  console.log("Server Started");
});

app.get("/movies", (req, res) => {
  const { genre, year } = req.query;
  if (!genre || !year)
    return res.send("Error : genre & year both are required.");
  const movies = JSON.parse(fs.readFileSync("./movie.json", "utf-8"));
  // const filteredMovies = movies.filter(movie => movie.genre === genre && movie.year == year);

  const filteredMovies = movies.filter(movie => movie.genre === genre && year.includes(movie.year));
  res.json(filteredMovies);
});

/*
Just use "year.includes(movie.year)"
This checks if the movie's year exists anywhere in the comma-separated string. Making it work for "single year" & "multiple years". 
*/