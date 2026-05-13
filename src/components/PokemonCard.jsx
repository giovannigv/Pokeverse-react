import styles from "./PokemonCard.module.css";
import TypeBadge from "./TypeBadge";

function PokemonCard({ name, number, type, id, isFavorite, onToggleFavorite }) {
  return (
    <div className={styles.card}>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={name} />
      <h3>{name}</h3>
      <p className={styles.number}>#{number}</p>
      <TypeBadge type={type} />
      <button className={isFavorite ? styles.favorited : ''}
        onClick={() => onToggleFavorite(id)}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default PokemonCard;
