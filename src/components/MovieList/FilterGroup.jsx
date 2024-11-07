import React from "react";

const FilterGroup = ({ minRating, onRatingClick, ratings }) => {
  return (
    <ul className="align_center movie_filter">
      {ratings.map((rate) => (
        <li
          className={`movie_filter_item ${minRating === rate ? "active" : ""}`}
          key={rate}
          onClick={() => onRatingClick(rate)}
        >
          {rate}+ star
        </li>
      ))}
    </ul>
  );
};

export default FilterGroup;
