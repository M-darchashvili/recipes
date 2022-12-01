import React from "react";
import {movieGenreIDs as genres} from "../movieGenresIDs";

function MovieCard({ basePosterURL, genre_ids, title, poster_path, vote_average }) {
  return (
    <article className="movie__card">
      <img src={`${basePosterURL + poster_path}`} alt={title} />
      <header className="movie__card__header">
        <h1>{title}</h1>
        <h1>{vote_average}</h1>
      </header>
      <ul className="movie__card__genres">
        {
          genre_ids.map((id, index) => {
            return <li key={index}>{genres[id]}</li>
          })
        }
      </ul>
    </article>
  );
}

export default MovieCard;
