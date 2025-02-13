import { useEffect, useState } from 'react'
import heroImage from './assets/hero.png'
import Search from './components/Search'
import MovieCard from './components/MovieCard'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [movieList, setMovieList] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  const API_BASE_URL = 'https://api.themoviedb.org/3'

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const API_OPTIONS = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: `Bearer ${API_KEY}`,
    },
  }

  const fetchMovie = async ( query = '') => {
    setIsLoading(true)
    setErrorMessage('')
    try {
      const endpoint = query
      ?`${API_BASE_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_BASE_URL}/discover/movie?sort_by=popularity.desc`
      const response = await fetch(endpoint, API_OPTIONS)

      if (!response.ok) {
        throw new Error('Failed to fetch movies')
      }

      const data = await response.json()
      console.log(data)

      if (data.Response === 'False') {
        setErrorMessage(data.Error || 'Error fetching movies')
        setMovieList([])
        return
      }

      setMovieList(data.results || [])
    } catch (error) {
      console.log('Error fetching movies:', error)
      setErrorMessage('Error fetching movies please try again later')
    } finally {
      setIsLoading(false)
    }
  }
  //useEffect
  useEffect(() => {
    fetchMovie(searchTerm)
  }, [searchTerm])

  return (
    <main>
      <div className="pattern"></div>
      <div className="wrapper">
        <header>
          <img src={heroImage} alt="hero" />
          <h1>
            Find <span className="text-gradient">Movies </span>You&#39;ll Love
            Enjoy without Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>
          {isLoading ? (
            <p className="text-white">Loading...</p>
          ) : errorMessage ? (
            <p className="text-red-700">{setErrorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => {
                return(
                  <MovieCard key={movie.id} movie={movie} />
                )
              })}
            </ul>
          )}
        </section>
      </div>
    </main>
  )
}
export default App
