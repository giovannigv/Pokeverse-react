import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import { usePokeverse, ACTIONS } from '../context/PokeverseContext';

function Header() {

  const { state, dispatch } = usePokeverse();

  return (
    <header className={styles.header}>
      <h1 className={styles.logo}>
        <span></span> PokéVerse
      </h1>

      <nav className={styles.nav}>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/favorites"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          ❤️ Favorites ({state.favorites.length})
        </NavLink>

        <NavLink
          to="/trainer"
          className={({ isActive }) =>
            `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`
          }
        >
          👤 {state.trainer?.name ?? 'Trainer'}
        </NavLink>
      </nav>

      <div className={styles.actions}>
        {!state.trainer && (
          <button
            className={styles.setupBtn}
            onClick={() => dispatch({ type: ACTIONS.TOGGLE_TRAINER_FORM })}
          >
            Set up Trainer
          </button>
        )}

        <button
          className={styles.themeToggle}
          onClick={() => dispatch({ type: ACTIONS.TOGGLE_THEME })}
        >
          {state.theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>

    </header>
  );
}

export default Header;