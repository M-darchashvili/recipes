import React, { useCallback, useEffect, useState, useMemo } from "react";
import LoadingScreen from "./components/LoadingScreen";
import MovieCard from "./components/MovieCard";

// Persoonlijke access token
const accessTokenV3 = "912d8b198abb729cae5c6dab7c5173c9";

// URL voor het vinden van populaire films
const baseURL = `https://api.themoviedb.org/3/discover/movie?api_key=${accessTokenV3}`;

// Standaard URL voor filmposters
const basePosterURL = "https://image.tmdb.org/t/p/original/";

function App() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  /*
    Haal data op van de database
    Converteer de data naar JSON
    En initialiseer movies met de array waar de films in zitten
  */
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(baseURL);
      const result = await response.json();
      setMovies(result.results);
      setLoading(false);
    }
    catch (error) {
      console.log("Could not fetch data.\n" + error);
      setLoading(false);
    }
  }, []);

  /*
    Maak film kaarten
    Ik maak hier gebruik van useMemo vanwege de filmposters
    zodat ze niet elke keer opgehaald hoeven te worden bij elke re-render
  */
  const createMovieCards = useMemo(() => {
    return movies.map((movie) => {
      return <MovieCard key={movie.id} basePosterURL={basePosterURL} {...movie} />;
    });
  }, [movies]);

  // Haal data op, op het moment dat deze component gemount word
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Laat een laadscherm zien terwijl de data wordt opgehaald
  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <main>
      <header className="page__title">
        <h1>20 popular movies</h1>
      </header>
      <section className="movie__cards">
        {createMovieCards}
      </section>
    </main>
  );
}

export default App;
