import React from "react";
import "./MovieCard.css";
import Star from "../../assets/star.png";

const MovieCard = ({ movie }) => {
  return (
    <a
      href={`https://www.imdb.com/title/${movie.imdbID}`}
      className="movie_card"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img
        src={
          movie.Poster !== "N/A"
            ? movie.Poster
            : "https://via.placeholder.com/150"
        }
        alt={movie.Title || "Movie Poster"}
        className="movie_poster"
      />
      <div className="movie_details">
        <h3 className="movie_details_heading">{movie.Title || "Untitled"}</h3>
        <div className="align_center movie_date_rate">
          <p>{movie.Year || "Year Unknown"}</p>
          <p>
            {movie.imdbRating ? `${movie.imdbRating} ` : "N/A"}
            <img src={Star} alt="rating icon" className="card_emoji" />
          </p>
        </div>
        <p className="movie_description">
          {movie.Plot && movie.Plot.length > 0
            ? movie.Plot
            : "Description not available."}
        </p>
      </div>
    </a>
  );
};

export default MovieCard;
