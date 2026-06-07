import styles from './TrainerPage.module.css';
import { usePokeverse, ACTIONS } from '../context/PokeverseContext';

const typeColors = {
  Fire:     '#f08030',
  Water:    '#6890f0',
  Grass:    '#78c850',
  Electric: '#f8d030',
  Psychic:  '#f85888',
  Normal:   '#a8a878',
}

const regionFlags = {
  Kanto:  '🗾',
  Johto:  '🌸',
  Hoenn:  '🌊',
  Sinnoh: '❄️',
}

function TrainerPage() {
  const { state, dispatch } = usePokeverse();
  const trainer = state.trainer;

  return (
    <div className={styles.page}>

      {trainer ? (
        <div className={styles.card}>

          {/* Avatar */}
          <div className={styles.avatarSection}>
            <div className={styles.avatar}>
              {trainer.name.charAt(0).toUpperCase()}
            </div>
            <div className={styles.avatarInfo}>
              <h1 className={styles.trainerName}>{trainer.name}</h1>
              <span className={styles.trainerTitle}>Pokémon Trainer</span>
            </div>
          </div>

          <div className={styles.divider} />

          {/* Info rows */}
          <div className={styles.infoSection}>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>✉️</span>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Email</span>
                <span className={styles.infoValue}>{trainer.email}</span>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>{regionFlags[trainer.region] ?? '🌍'}</span>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Region</span>
                <span className={styles.infoValue}>{trainer.region}</span>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>⭐</span>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Favorite Type</span>
                <span
                  className={styles.typeBadge}
                  style={{ backgroundColor: typeColors[trainer.favoriteType] ?? '#888' }}
                >
                  {trainer.favoriteType}
                </span>
              </div>
            </div>

            <div className={styles.infoRow}>
              <span className={styles.infoIcon}>❤️</span>
              <div className={styles.infoContent}>
                <span className={styles.infoLabel}>Favorites</span>
                <span className={styles.infoValue}>
                  {state.favorites.length} {state.favorites.length === 1 ? 'Pokémon' : 'Pokémons'}
                </span>
              </div>
            </div>

          </div>

          <div className={styles.divider} />

          {/* Actions */}
          <div className={styles.actions}>
            <button
              className={styles.editBtn}
              onClick={() => dispatch({ type: ACTIONS.TOGGLE_TRAINER_FORM })}
            >
              ✏️ Edit Profile
            </button>

            {state.favorites.length > 0 && (
              <button
                className={styles.clearBtn}
                onClick={() => dispatch({ type: ACTIONS.CLEAR_FAVORITES })}
              >
                🗑️ Clear Favorites
              </button>
            )}
          </div>

        </div>
      ) : (
        <div className={styles.emptyState}>
          <span className={styles.emptyIcon}>👤</span>
          <h2>No trainer set up yet</h2>
          <p>Create your trainer profile to get started</p>
          <button
            className={styles.setupBtn}
            onClick={() => dispatch({ type: ACTIONS.TOGGLE_TRAINER_FORM })}
          >
            Set up Trainer
          </button>
        </div>
      )}

    </div>
  )
}

export default TrainerPage;
