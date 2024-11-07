import React, { useEffect, useState } from "react";
import _ from "lodash";
import "./MovieList.css";
import MovieCard from "./MovieCard";
import FilterGroup from "./FilterGroup";

const MovieList = ({ type, title, emoji }) => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [minRating, setMinRating] = useState(0);
  const [sortBy, setSortBy] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    let updatedMovies = [...movies];

    if (minRating > 0) {
      updatedMovies = updatedMovies.filter(
        (movie) => parseFloat(movie.imdbRating) >= minRating
      );
    }

    if (sortBy) {
      updatedMovies = _.orderBy(updatedMovies, [sortBy], [sortOrder]);
    }

    setFilteredMovies(updatedMovies);
  }, [movies, minRating, sortBy, sortOrder]);

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `https://www.omdbapi.com/?s=${type}&apikey=2d20e59b`
      );
      const data = await response.json();
      if (data.Search) {
        const movieDetailsPromises = data.Search.map(async (movie) => {
          const detailsResponse = await fetch(
            `https://www.omdbapi.com/?i=${movie.imdbID}&apikey=2d20e59b&plot=short`
          );
          return detailsResponse.json();
        });
        const moviesWithDetails = await Promise.all(movieDetailsPromises);
        setMovies(moviesWithDetails);
        setFilteredMovies(moviesWithDetails);
      } else {
        console.log("No movies found");
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const handleFilter = (rate) => {
    setMinRating(rate === minRating ? 0 : rate);
  };

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderChange = (e) => {
    setSortOrder(e.target.value);
  };

  return (
    <section className="movie_list" id={type}>
      <header className="align_center movie_list_header">
        <h2 className="align_center movie_list_heading">
          {title}{" "}
          <img src={emoji} alt={`${emoji} icon`} className="navbar_emoji" />
        </h2>
        <div className="align_center movie_list_fs">
          <FilterGroup
            minRating={minRating}
            onRatingClick={handleFilter}
            ratings={[8, 7, 6]}
          />

          <select
            name="sortType"
            className="movie_sorting"
            onChange={handleSort}
            value={sortBy}
          >
            <option value="">Sort By</option>
            <option value="Year">Date</option>
            <option value="imdbRating">Rating</option>
          </select>

          <select
            name="sortOrder"
            className="movie_sorting"
            onChange={handleSortOrderChange}
            value={sortOrder}
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </header>
      <div className="movie_cards">
        {filteredMovies.map((movie) => (
          <MovieCard key={movie.imdbID} movie={movie} />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
