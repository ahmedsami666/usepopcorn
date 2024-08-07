import React, { useState, useEffect } from "react";
import StarRating from "./StarRating";
/*const tempMovieData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
  },
  {
    imdbID: "tt0133093",
    Title: "The Matrix",
    Year: "1999",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BNzQzOTk3OTAtNDQ0Zi00ZTVkLWI0MTEtMDllZjNkYzNjNTc4L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_SX300.jpg",
  },
  {
    imdbID: "tt6751668",
    Title: "Parasite",
    Year: "2019",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BYWZjMjk3ZTItODQ2ZC00NTY5LWE0ZDYtZTI3MjcwN2Q5NTVkXkEyXkFqcGdeQXVyODk4OTc3MTY@._V1_SX300.jpg",
  },
];

const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];*/
const KEY = 'd1f3c20e'
const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

const Navbar = ({children}) => {
  return (
    <nav className="nav-bar">
      <Logo />
      {children}
    </nav>
  )
}

const Logo = () => {
  return (
    <div className="logo">
      <span role="img">🍿</span>
      <h1>usePopcorn</h1>
    </div>
  )
}

const Search = ({query, setQuery}) => {
  return (
    <input
      className="search"
      type="text"
      placeholder="Search movies..."
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  )
}

const NumResults = ({movies}) => {
  return (
    <p className="num-results">
      Found <strong>{movies.length}</strong> results
    </p>
  )
}

const Main = ({children}) => {
  return (
    <main className="main">
      {children}
    </main>
  )
}

const Box = ({children}) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className="box">
      <button
        className="btn-toggle"
        onClick={() => setIsOpen((open) => !open)}
      >
        {isOpen ? "–" : "+"}
      </button>
      {isOpen && children}
    </div>
  )
}

const MoviesList = ({movies, handleSelectedMovie}) => {
  return (
    <ul className="list">
      {movies?.map((movie) => (
        <Movie movie={movie} key={movie.imdbID} handleSelectedMovie={handleSelectedMovie}/>
      ))}
    </ul>
  )
}

const Movie = ({ movie, handleSelectedMovie}) => {
  return (
    <li key={movie.imdbID} onClick={() => handleSelectedMovie(movie.imdbID)}>
      <img src={movie.Poster} alt={`${movie.Title} poster`} />
      <h3>{movie.Title}</h3>
      <div>
        <p>
          <span>🗓</span>
          <span>{movie.Year}</span>
        </p>
      </div>
    </li>
  )
}

const WatchedSummary = ({ watched }) => {
  const avgImdbRating = average(watched.map((movie) => movie.imdbRating));
  const avgUserRating = average(watched.map((movie) => movie.userRating));
  const avgRuntime = average(watched.map((movie) => movie.runtime));
  return (
    <div className="summary">
      <h2>Movies you watched</h2>
      <div>
        <p>
          <span>#️⃣</span>
          <span>{watched.length} movies</span>
        </p>
        <p>
          <span>⭐️</span>
          <span>{avgImdbRating.toFixed(2)}</span>
        </p>
        <p>
          <span>🌟</span>
          <span>{avgUserRating.toFixed(2)}</span>
        </p>
        <p>
          <span>⏳</span>
          <span>{avgRuntime} min</span>
        </p>
      </div>
    </div>
  )
}
const WatchedMoviesList = ({watched, handleDeleteWatched}) => {
  return (
    <ul className="list">
            {watched.map((movie) => (
              <WatchedMovie movie={movie} key={movie.imdbID} handleDeleteWatched={handleDeleteWatched}/>
            ))}
          </ul>
  )
}
const WatchedMovie = ({movie, handleDeleteWatched}) => {
  return (
    <li key={movie.imdbID}>
                <img src={movie.poster} alt={`${movie.title} poster`} />
                <h3>{movie.title}</h3>
                <div>
                  <p>
                    <span>⭐️</span>
                    <span>{movie.imdbRating}</span>
                  </p>
                  <p>
                    <span>🌟</span>
                    <span>{movie.userRating}</span>
                  </p>
                  <p>
                    <span>⏳</span>
                    <span>{movie.runtime} min</span>
                  </p>
                  <button className="btn-delete" onClick={() => handleDeleteWatched(movie.imdbID)}>
                    X
                  </button>
                </div>
              </li>
  )
}
const Loader = () => {
  return (
    <p className="loader">Loading...</p>
  )
}
const ErrorMessage = ({message}) => {
  return (
    <p className="error">{message}</p>
  )
}
const MovieDetails = ({selectedId, handleCloseMovie, handleAddWatched, watched}) => {
  const [movie, setMovie] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const isWatched = watched.map((movie) => movie.imdbID).includes(selectedId)
  const watchedMovieRating = watched.find((movie) => movie.imdbID === selectedId)?.userRating
  const {
    Title: title,
    Actors: actors,
    Year: year,
    Poster: poster,
    Plot: plot,
    Runtime: runtime,
    imdbRating,
    Released: released,
    Director: director,
    Genre: genre
  } = movie
  const handleAdd = () => {
    const newWatchedMovie = {
      imdbID: selectedId,
      title,
      year,
      poster,
      imdbRating: Number(imdbRating),
      runtime: Number(runtime.split(" ").at(0)),
      userRating
    }
    handleAddWatched(newWatchedMovie)
    handleCloseMovie()
  }
  useEffect(() => {
    async function getMovieDetails() {
      setIsLoading(true)
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${selectedId}`)
      const data = await res.json()
      setMovie(data)
      setIsLoading(false)
    }
    getMovieDetails()
  }, [selectedId])
  useEffect(() => {
    if (!title) {
      return
    }
    document.title = `movie: ${title}`
    return () => {
      document.title = 'usePopcorn'
    }
  }, [title])
  return (
    <div className="details">
      {isLoading? <Loader /> :
      <>
            <header>
            <button className="btn-back" onClick={handleCloseMovie}>
              &larr;
            </button>
            <img src={poster} alt={`poster of ${title}`}/>
            <div className="details-overview">
              <h2>{title}</h2>
              <p>{released} &bull; {runtime}</p>
              <p>{genre}</p>
              <p>{imdbRating} IMDB rating</p>
            </div>
            </header>
            <section>
              <div className="rating">
              {!isWatched ? <>
              <StarRating maxRating={10} size={24} setUserRating={setUserRating} userRating={userRating}/>
              {userRating > 0 && <button className="btn-add" onClick={handleAdd}>+ add to list</button>}
              </>: <p>you rated movie with {watchedMovieRating}</p>}
              </div>
              <p><em>{plot}</em></p>
              <p>starring: {actors}</p>
              <p>directed by {director}</p>
            </section>
            </>
      }
    </div>
  )
}
export default function App() {
  const [query, setQuery] = useState('')
  const [movies, setMovies] = useState([]);
  const [watched, setWatched] = useState([]);
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  
  const handleSelectedMovie = (id) => {
    setSelectedId(selectedId => selectedId === id? null : id)
  }
  const handleCloseMovie = () => {
    setSelectedId(null)
  }
  const handleAddWatched = (movie) => {
    setWatched((watched) => [...watched, movie])
  }
  const handleDeleteWatched = (id) => {
    setWatched((watched) => watched.filter((movie) => movie.imdbID !== id))
  }
  useEffect(function (){
    const controller = new AbortController()
    async function fetchMoives() {
      try {
        setIsLoading(true)
        setError("")
        const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&s=${query}`, {signal: controller.signal})
        if (!res.ok) {
          throw new Error("something went wrong with fetching movies")
        }
        const data = await res.json()
        if (data.Response === "False") {
          throw new Error("movie not found")
        }
        setMovies(data.Search)
        setError("")
      }
      catch (err) {
        if (err.name !== 'AbortError') {
          console.log(err.message)
          setError(err.message)
        }
      }
      finally {
        setIsLoading(false)
      }
    }
    if (query.length < 1) {
      setMovies([])
      setError('')
      return
    }
    fetchMoives()
    return () => {
      controller.abort()
    }
  }, [query])
  return (
    <>
      <Navbar>
        <Search query={query} setQuery={setQuery}/>
        <NumResults movies={movies}/>
      </Navbar>
      <Main>
        <Box>
          {isLoading && <Loader />}
          {!isLoading && !error && <MoviesList movies={movies} handleSelectedMovie={handleSelectedMovie}/>}
          {error && <ErrorMessage message={error}/>}
        </Box>
        <Box>
          {selectedId ? 
          <MovieDetails selectedId={selectedId} handleCloseMovie={handleCloseMovie} handleAddWatched={handleAddWatched} watched={watched}/> : 
            <>
              <WatchedSummary watched={watched} />
              <WatchedMoviesList watched={watched} handleDeleteWatched={handleDeleteWatched} />
            </>
          }
        </Box>
      </Main>
    </>
  );
}
