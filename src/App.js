import { useEffect, useState } from "react";

import './App.css';
import Header from './components/Header';
import PokemonGrid from './components/PokemonGrid';

function App() {

  const [search, setSearch] = useState("");
  const [favorites, setFavorites] = useState([]);

  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {

    async function loadPokemons() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=18');
        const data = await res.json();

        const detailedPokemons = await Promise.all(
          data.results.map(p => fetch(p.url).then(res => res.json()))
        )

        const formatted = detailedPokemons.map(p => ({
          id: p.id,
          name: p.name.charAt(0).toUpperCase() + p.name.slice(1),
          number: p.id.toString().padStart(3, '0'),
          type: p.types[0].type.name
        }));

        setPokemons(formatted);
      } catch (error) {
        setError('Error loading pokemons: ' + error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPokemons()
  }, [retryCount])

  const filteredPokemons = pokemons.filter(p => p.name.toLowerCase().includes(search.toLowerCase()))

  function handleToggleFavorite(id) {
    setFavorites(prevFavorites =>
      prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id]
    )
  }

  return (
    <div className="App">
      <Header favoritesCount={favorites.length} />

      {!loading && error && (
        <div className="error-state">
          <h2>Error loading Pokémons</h2>
          <button onClick={() => setRetryCount(prev => prev + 1)}>
            Try again
          </button>
        </div>
      )}

      {loading && <h2>Loading pokemons...</h2>}

      {!loading && !error && (
        <>
          <input className="search-input"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search..." />

          <PokemonGrid pokemons={filteredPokemons}
            favorites={favorites}
            onToggleFavorite={handleToggleFavorite}
          >
            <h2>1 Generation - Kanto</h2>
          </PokemonGrid>
        </>
      )}
    </div>
  );
}

export default App;
