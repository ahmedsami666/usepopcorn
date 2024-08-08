import { useState, useEffect } from "react";
const KEY = 'd1f3c20e'

export function useMovies (query) {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState('')
    const [movies, setMovies] = useState([]);

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
      return {movies, isLoading, error}
}