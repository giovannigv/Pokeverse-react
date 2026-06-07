import styles from './Header.module.css';

function Header({ favoritesCount, trainer, isTrainerFormOpen, setIsTrainerFormOpen }) {
  return (
    <header  className={styles.header}>
      <h1 className={styles.logo}>
        <span></span> PokéVerse
      </h1>

      <div className={styles.trainerInfo}>
        {trainer?.name ? (
          <>
            <span className={styles.trainerName}>👤 {trainer.name}</span>
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

      <div className={styles.favorites}>
        ❤️ {favoritesCount} {favoritesCount === 1 ? 'favorite' : 'favorites'}
      </div>
    </header>
  );
}

export default Header;