import { useEffect, useState } from "react";
import { usePokeverse } from './context/PokeverseContext';

import './App.css';
import Header from './components/Header';
import PokemonGrid from './components/PokemonGrid';
import Filters from './components/Filters';
import TrainerForm from './components/TrainerForm';

function App() {

  const { state } = usePokeverse();

  const [search, setSearch] = useState("");

  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 18;
  const [order, setOrder] = useState('low');
  const [selectedType, setSelectedType] = useState('all');
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [retryCount, setRetryCount] = useState(0);

  const [isTrainerFormOpen, setIsTrainerFormOpen] = useState(false);


  const TOTAL_POKEMONS = 151;  // Gen 1
  const totalPages = Math.ceil(TOTAL_POKEMONS / limit);

  useEffect(() => {

    async function loadPokemons() {
      try {
        setLoading(true);
        setError(null);

        const offset = (page - 1) * limit;

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
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

        // Create Filter by Types
        setTypes(['all', ...new Set(formatted.map(p => p.type))]);

      } catch (error) {
        setError('Error loading pokemons: ' + error.message);
      } finally {
        setLoading(false);
      }
    }

    loadPokemons()
  }, [retryCount, page])

  const filteredPokemons = pokemons
    .filter(p => selectedType === 'all' || p.type === selectedType)
    .filter(p => p.name.toLowerCase().includes(search.toLowerCase())).sort((a, b) => {
      if (order === 'az') return a.name.localeCompare(b.name);
      if (order === 'za') return b.name.localeCompare(a.name);
      if (order === 'high') return b.id - a.id;
      if (order === 'low') return a.id - b.id;
      return 0;
    });

  function handlePageChange(newPage) {
    setPage(newPage)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={`App ${state.theme === 'dark' ? 'dark' : ''}`}>
      <Header setIsTrainerFormOpen={setIsTrainerFormOpen}/>

      {isTrainerFormOpen && (
        <TrainerForm isOpen={isTrainerFormOpen} setIsOpen={setIsTrainerFormOpen}/>
      )}

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
        <div>
          <PokemonGrid pokemons={filteredPokemons}>
            <h2>1 Generation - Kanto</h2>
            <Filters types={types}
              setSelectedType={setSelectedType}
              selectedType={selectedType}
              search={search}
              order={order}
              onSearchChange={(value) => setSearch(value)}
              onOrderChange={(value) => setOrder(value)}
            />
          </PokemonGrid>

          <div className="pagination">
            <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
              Previous
            </button>
            <span>Page {page} of {totalPages}</span>
            <button onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
