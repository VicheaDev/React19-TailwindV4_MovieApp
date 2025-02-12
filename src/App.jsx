import { useEffect, useState } from 'react'
import heroImage from './assets/hero.png'
import Search from './components/Search'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [error, setError] = useState(null)

  const API_BASE_URL = 'https://api.themoviedb.org/3'

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY

  const API_OPTIONS = {
    method: 'GET',
    header: {
      accept: 'application/json',
      Authorization: 'Bearer ${API_KEY}',
    },
  }

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/movie/popular?api_key=${API_KEY}`,
        API_OPTIONS,
      )
      const data = await response.json()
      console.log(data)
    } catch (error) {
      console.error('Error fetching movies:', error)
      setError(error)
    }
  }
  //useEffect
  useEffect(() => {}, [])

  return (
    <main>
      <div className="pattern"></div>
      <div className="warper">
        <header>
          <img src={heroImage} alt="hero" />
          <h1>
            Find <span className="text-gradient">Movies </span>You&#39;ll Love
            Enjoy without Hassle
          </h1>
        </header>
        <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      </div>
    </main>
  )
}
export default App
