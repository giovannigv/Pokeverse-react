import styles from './PokemonDetailPage.module.css';

import { useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { usePokeverse, ACTIONS } from '../context/PokeverseContext';

const typeColors = {
  fire: '#f08030',
  water: '#6890f0',
  grass: '#78c850',
  electric: '#f8d030',
  poison: '#a040a0',
  flying: '#a890f0',
  psychic: '#f85888',
  ice: '#98d8d8',
  dragon: '#7038f8',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
  normal: '#a8a878',
  fighting: '#c03028',
  ground: '#e0c068',
  steel: '#b8b8d0',
  dark: '#705848',
  fairy: '#ee99ac',
}

const statConfig = [
  { key: 'hp', label: 'HP', icon: '❤️', color: '#ff5959' },
  { key: 'attack', label: 'Attack', icon: '⚔️', color: '#f5ac78' },
  { key: 'defense', label: 'Defense', icon: '🛡️', color: '#fae078' },
  { key: 'specialAttack', label: 'Sp. Atk', icon: '✨', color: '#9db7f5' },
  { key: 'specialDefense', label: 'Sp. Def', icon: '💫', color: '#a7db8d' },
  { key: 'speed', label: 'Speed', icon: '💨', color: '#fa92b2' },
]

function PokemonDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const { state, dispatch } = usePokeverse();
  const isFavorite = state.favorites.includes(pokemon?.id);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const mainColor = typeColors[pokemon?.types[0]] ?? '#888'

  useEffect(() => {

    async function fetchpokemon() {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
        const data = await res.json();

        const formatted = {
          id: data.id,
          name: data.name.charAt(0).toUpperCase() + data.name.slice(1),
          number: data.id.toString().padStart(3, '0'),
          image: data.sprites.other['official-artwork'].front_default,
          types: data.types.map(t => t.type.name),
          abilities: data.abilities.map(a =>
            a.ability.name.charAt(0).toUpperCase() + a.ability.name.slice(1)
          ),
          height: data.height / 10,
          weight: data.weight / 10,
          // stats
          hp: data.stats.find(s => s.stat.name === 'hp')?.base_stat,
          attack: data.stats.find(s => s.stat.name === 'attack')?.base_stat,
          defense: data.stats.find(s => s.stat.name === 'defense')?.base_stat,
          specialAttack: data.stats.find(s => s.stat.name === 'special-attack')?.base_stat,
          specialDefense: data.stats.find(s => s.stat.name === 'special-defense')?.base_stat,
          speed: data.stats.find(s => s.stat.name === 'speed')?.base_stat,
        };

        setPokemon(formatted);
      }
      catch (error) {
        setError('Failed to load Pokémon details. Please try again.');
      }
      finally {
        setLoading(false);
      }
    }

    fetchpokemon();
  }, [id])

  return (
    <div className={styles.page}>

      {/* Botão voltar */}
      <button className={styles.backBtn} onClick={() => navigate(-1)}>
        ← Back
      </button>
      {!loading &&
      <div className={styles.card}>

        {/* Hero — imagem + info principal */}
        <div className={styles.hero} style={{ background: `linear-gradient(135deg, ${mainColor}33, ${mainColor}11)` }}>

          <div className={styles.heroInfo}>
            <span className={styles.number}>#{pokemon?.number}</span>
            <h1 className={styles.name}>{pokemon?.name}</h1>

            <div className={styles.types}>
              {pokemon?.types.map(type => (
                <span
                  key={type}
                  className={styles.typeBadge}
                  style={{ backgroundColor: typeColors[type] ?? '#888' }}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </span>
              ))}
            </div>

            <p className={styles.description}>{pokemon?.description}</p>
          </div>

          <div className={styles.heroImage}>
            <img src={pokemon?.image} alt={pokemon?.name} />
          </div>

        </div>

        {/* Medidas */}
        <div className={styles.measures}>
          <div className={styles.measureItem}>
            <span className={styles.measureIcon}>📏</span>
            <span className={styles.measureValue}>{pokemon?.height}m</span>
            <span className={styles.measureLabel}>Height</span>
          </div>
          <div className={styles.measureDivider} />
          <div className={styles.measureItem}>
            <span className={styles.measureIcon}>⚖️</span>
            <span className={styles.measureValue}>{pokemon?.weight}kg</span>
            <span className={styles.measureLabel}>Weight</span>
          </div>
          <div className={styles.measureDivider} />
          <div className={styles.measureItem}>
            <span className={styles.measureIcon}>⚡</span>
            <span className={styles.measureValue}>{pokemon?.abilities.join(', ')}</span>
            <span className={styles.measureLabel}>Abilities</span>
          </div>
        </div>

        {/* Stats */}
        <div className={styles.statsSection}>
          <h2 className={styles.sectionTitle}>Base Stats</h2>

          {statConfig.map(({ key, label, icon, color }) => {
            const value = pokemon[key];
            const percent = Math.round((value / 255) * 100)

            return (
              <div key={key} className={styles.statRow}>
                <span className={styles.statIcon}>{icon}</span>
                <span className={styles.statLabel}>{label}</span>
                <span className={styles.statValue}>{value}</span>
                <div className={styles.statBarBg}>
                  <div
                    className={styles.statBarFill}
                    style={{ width: `${percent}%`, backgroundColor: color }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Botão favoritar */}
        <button
          className={`${styles.favoriteBtn} ${isFavorite ? styles.favoriteBtnActive : ''}`}
          onClick={() => dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: pokemon.id })}
        >
          {isFavorite ? '❤️ Favorited!' : '🤍 Add to Favorites'}
        </button>

      </div>
      }

      {loading && !pokemon && (
        <div className={styles.loadingState}>
          <h2>Loading Pokémon details...</h2>
        </div>
      )}

      {error && (
        <div className={styles.errorState}>
          <h2>{error}</h2>
          <button className={styles.retryBtn} onClick={() => {
            setError(null);
            setLoading(true);
            setPokemon(null);
          }}>
            Retry
          </button>
        </div>
      )}
    </div>
  )
}

export default PokemonDetailPage;
