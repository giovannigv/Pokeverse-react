import { useNavigate } from 'react-router-dom';

import styles from "./PokemonCard.module.css";
import TypeBadge from "./TypeBadge";

function PokemonCard({ name, number, type, id, isFavorite, onToggleFavorite }) {
  const navigate = useNavigate();
  
  return (
    <div className={styles.card} onClick={() => navigate(`/pokemon/${id}`)}>
      <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`} alt={name} />
      <h3>{name}</h3>
      <p className={styles.number}>#{number}</p>
      <TypeBadge type={type} />
      <button className={isFavorite ? styles.favorited : ''}
        onClick={(e) => {
          e.stopPropagation();
          onToggleFavorite(id);
        }}>
        {isFavorite ? '❤️' : '🤍'}
      </button>
    </div>
  );
}

export default PokemonCard;
