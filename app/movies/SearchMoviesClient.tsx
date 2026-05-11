'use client'
import { useState, useEffect } from 'react'
import axios from 'axios'

export default function SearchMoviesClient() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<any[]>([])
  const [selected, setSelected] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const API_KEY = '3c5586b5'

  useEffect(() => {
    if (query.length < 3) {
      setResults([])
      return
    }
    const timer = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${query}`)
        setResults(res.data.Search || [])
      } catch (error) {
        console.error('Error buscando películas', error)
      } finally {
        setLoading(false)
      }
    }, 500)
    return () => clearTimeout(timer)
  }, [query])

  const getDetails = async (id: string) => {
    const res = await axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${id}&plot=full`)
    setSelected(res.data)
  }

  return (
    <div className="mt-10 rounded-2xl p-6 border" style={{background: 'rgba(255,255,255,0.02)', borderColor: 'rgba(6,182,212,0.2)'}}>
      
      <div className="flex items-center gap-4 mb-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold text-white">Búsqueda</h2>
        </div>
        <span className="px-3 py-1 rounded-full text-xs font-bold border"
          style={{background: 'rgba(6,182,212,0.15)', borderColor: 'rgba(6,182,212,0.4)', color: '#22d3ee'}}>
          CSR — Cliente
        </span>
      </div>

      {/* Input */}
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Busca una película o serie... (mínimo 3 letras)"
          className="w-full p-4 rounded-xl text-white placeholder-gray-500 focus:outline-none transition-all"
          style={{
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(168,85,247,0.4)',
          }}
          onFocus={e => (e.target.style.borderColor = 'rgba(6,182,212,0.8)')}
          onBlur={e => (e.target.style.borderColor = 'rgba(168,85,247,0.4)')}
        />
        {query.length > 0 && query.length < 3 && (
          <p className="text-xs mt-2" style={{color: 'rgba(168,85,247,0.7)'}}>Escribe al menos 3 letras...</p>
        )}
      </div>

      {/* Resultados */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
        {loading ? (
          <div className="col-span-4 text-center py-8">
            <div className="inline-block w-10 h-10 rounded-full border-2 border-transparent animate-spin"
              style={{borderTopColor: '#a855f7', borderRightColor: '#06b6d4'}}></div>
            <p className="mt-3 text-gray-400">Buscando...</p>
          </div>
        ) : (
          results.slice(0, 8).map((movie: any) => (
            <div
              key={movie.imdbID}
              onClick={() => getDetails(movie.imdbID)}
              className="rounded-xl overflow-hidden cursor-pointer border transition-all duration-300"
              style={{background: 'rgba(255,255,255,0.04)', borderColor: 'rgba(168,85,247,0.2)'}}
              onMouseEnter={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.7)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = '0 0 20px rgba(168,85,247,0.25)'
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLElement).style.borderColor = 'rgba(168,85,247,0.2)'
                ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
                ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
              }}
            >
              <div className="relative">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Sin+Poster'}
                  alt={movie.Title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"></div>
                <span className="absolute top-2 right-2 text-xs px-2 py-0.5 rounded-full capitalize font-semibold"
                  style={{background: 'rgba(168,85,247,0.7)', color: 'white'}}>
                  {movie.Type}
                </span>
              </div>
              <div className="p-3">
                <p className="text-white font-semibold text-sm truncate">{movie.Title}</p>
                <p className="text-xs mt-1" style={{color: '#22d3ee'}}>{movie.Year}</p>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 flex items-center justify-center p-4 z-50"
          style={{background: 'rgba(0,0,0,0.85)'}}
          onClick={() => setSelected(null)}
        >
          <div
            className="max-w-2xl w-full rounded-2xl overflow-hidden border"
            style={{
              background: 'linear-gradient(135deg, #0d0030, #000a1a)',
              borderColor: 'rgba(168,85,247,0.5)',
              boxShadow: '0 0 40px rgba(168,85,247,0.3)'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-col md:flex-row">
              <div className="relative md:w-2/5">
                <img
                  src={selected.Poster !== 'N/A' ? selected.Poster : 'https://via.placeholder.com/300'}
                  alt={selected.Title}
                  className="w-full h-64 md:h-full object-cover"
                />
                <div className="absolute inset-0" style={{background: 'linear-gradient(90deg, transparent 60%, #0d0030 100%)'}}></div>
              </div>
              <div className="p-6 flex-1">
                <h3 className="text-2xl font-bold text-white mb-1">{selected.Title}</h3>
                <p className="text-sm mb-3" style={{color: 'rgba(168,85,247,0.8)'}}>{selected.Year} • {selected.Rated} • {selected.Runtime}</p>
                <div className="flex items-center gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full text-sm font-bold"
                    style={{background: 'rgba(234,179,8,0.2)', color: '#fbbf24', border: '1px solid rgba(234,179,8,0.4)'}}>
                    ⭐ {selected.imdbRating}
                  </span>
                  <span className="text-xs text-gray-400">{selected.Genre}</span>
                </div>
                <p className="text-sm leading-relaxed text-gray-300 mb-4">{selected.Plot}</p>
                <p className="text-xs text-gray-400 mb-1"><span style={{color: '#22d3ee'}}>Director:</span> {selected.Director}</p>
                <p className="text-xs text-gray-400 mb-4"><span style={{color: '#22d3ee'}}>Actores:</span> {selected.Actors}</p>
                <button
                  onClick={() => setSelected(null)}
                  className="w-full py-2 rounded-xl font-bold transition-all text-white"
                  style={{background: 'linear-gradient(90deg, #7c3aed, #0891b2)'}}
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}