import axios from 'axios'
import SearchMoviesClient from './SearchMoviesClient'

async function getPopularMovies() {
  const API_KEY = '3c5586b5'
  try {
    const [res1, res2] = await Promise.all([
      axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=avengers`),
      axios.get(`https://www.omdbapi.com/?apikey=${API_KEY}&s=batman`)
    ])
    const all = [...(res1.data.Search || []), ...(res2.data.Search || [])]
    const unique = Array.from(new Map(all.map((m: any) => [m.imdbID, m])).values())
    return unique.slice(0, 8)
  } catch (error) {
    console.error("Error SSR fetching", error)
    return []
  }
}

export default async function MoviesPage() {
  const popularMovies = await getPopularMovies()

  return (
    <div className="min-h-screen text-white pb-10 bg-[#0a0015]">

      {/* Header */}
      <header className="text-center py-12 px-4 bg-gradient-to-b from-purple-950/50 to-transparent">
        <h1 className="text-6xl font-black tracking-widest text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-cyan-400 to-purple-400 mb-3">
          CINESI ⭐
        </h1>
        <div className="flex justify-center gap-2 mb-3">
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
          <div className="h-px w-32 bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>
        <p className="text-cyan-300 tracking-widest uppercase text-sm font-light">
          Tu universo de películas y series
        </p>
      </header>

      <main className="max-w-7xl mx-auto px-4">

        {/* Badge SSR */}
        <div className="flex items-center gap-4 mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <h2 className="text-2xl font-bold text-white">Tendencias</h2>
          </div>
          <span className="px-3 py-1 rounded-full text-xs font-bold bg-green-500/15 border border-green-500/40 text-green-400">
            SSR — Servidor
          </span>
        </div>

        {/* Grid SSR */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {popularMovies.map((movie: any) => (
            <div
              key={movie.imdbID}
              className="rounded-2xl overflow-hidden border border-purple-500/20 bg-white/[0.03] hover:border-cyan-400/60 hover:-translate-y-1 transition-all duration-300 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)]"
            >
              <div className="relative">
                <img
                  src={movie.Poster !== 'N/A' ? movie.Poster : 'https://via.placeholder.com/300x450?text=Sin+Poster'}
                  alt={movie.Title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              </div>
              <div className="p-3">
                <p className="font-semibold text-sm truncate text-white">{movie.Title}</p>
                <p className="text-xs mt-1 text-purple-400">{movie.Year}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Sección CSR */}
        <SearchMoviesClient />

        {/* Justificación */}
        <div className="mt-10 grid md:grid-cols-2 gap-4">
          <div className="rounded-2xl p-5 border bg-green-500/5 border-green-500/25">
            <p className="font-bold mb-2 text-green-400">✅ SSR — Películas Populares</p>
            <p className="text-sm leading-relaxed text-gray-300">
              Se usó SSR porque el listado inicial no depende de la interacción del usuario.
              El servidor obtiene los datos y los incluye en el HTML, mejorando el SEO
              y la velocidad de carga inicial.
            </p>
          </div>
          <div className="rounded-2xl p-5 border bg-cyan-500/5 border-cyan-500/25">
            <p className="font-bold mb-2 text-cyan-400">🔄 CSR — Búsqueda y Detalles</p>
            <p className="text-sm leading-relaxed text-gray-300">
              Se usó CSR porque la búsqueda requiere interactividad en tiempo real.
              Usando useEffect y useState, los resultados se actualizan mientras el
              usuario escribe, sin recargar la página.
            </p>
          </div>
        </div>

      </main>
    </div>
  )
}