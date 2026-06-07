import styles from './Header.module.css';
import { usePokeverse, ACTIONS } from '../context/PokeverseContext';

function Header({ isTrainerFormOpen, setIsTrainerFormOpen }) {

  const { state, dispatch } = usePokeverse();

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <span></span> PokéVerse
      </h1>

      <div className={styles.trainerInfo}>
        {state.trainer?.name ? (
          <>
            <span className={styles.trainerName}>👤 {state.trainer.name}</span>
            <button className={styles.editBtn}
              onClick={() => setIsTrainerFormOpen(true)}>
              Edit
            </button>
          </>
        ) : (
          <button className={styles.setupBtn}
            onClick={() => setIsTrainerFormOpen(!isTrainerFormOpen)}>
            Set up Trainer
          </button>
        )}
      </div>

      <button onClick={() => dispatch({ type: ACTIONS.TOGGLE_THEME })} className={styles.themeToggle}>
        {state.theme === 'light' ? '🌙' : '☀️'}
      </button>

      <div className={styles.favorites}>
        ❤️ {state.favorites.length} {state.favorites.length === 1 ? 'favorite' : 'favorites'}
      </div>
    </header>
  );
}

export default Header;