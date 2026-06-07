import styles from './FavoritesPage.module.css';

import { useNavigate } from 'react-router-dom';
import { usePokeverse, ACTIONS } from '../context/PokeverseContext';
import PokemonGrid from '../components/PokemonGrid';

function FavoritesPage() {
  const navigate = useNavigate();
  const { state, dispatch } = usePokeverse();

  return (
    <div className={styles.favoritesPage}>
      <div className={styles.favoritesHeader}>
        <h1 className={styles.favoritesTitle}>My Favorites Pokémon</h1>
      </div>
      { state.favorites.length === 0 ? (
        <div className={styles.emptyState}>
          <p>You haven't added any Pokémon to your favorites yet.</p>
          <p>Go back to the Home page and click the ❤️ icon on any Pokémon to add it to your favorites!</p>
          <button onClick={() => navigate('/')} className={styles.homeBtn}>
            Go to Home
          </button>
        </div>
      ) : null}
      {state.favorites.length > 0 && (
        <div>
          <PokemonGrid
            pokemons={state.favorites.map(id => ({
              id,
              name: '', // Name will be fetched in PokemonGrid
              number: id.toString().padStart(3, '0'),
              type: '' // Type will be fetched in PokemonGrid
            }))}
            favorites={state.favorites}
            onToggleFavorite={(id) => dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: id })}
          />

          <button className={styles.backBtn} onClick={() => navigate(-1)}>
            Back
          </button>
        </div>
      )}

    </div>
  );
}

export default FavoritesPage;