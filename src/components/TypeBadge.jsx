import styles from "./TypeBadge.module.css";

const typeColors = {
  grass: '#78c850',
  fire: '#f08030',
  water: '#6890f0',
  electric: '#f8d030',
  poison: '#a040a0',
  normal: '#a8a878',
  psychic: '#f85888',
  ice: '#98d8d8',
  dragon: '#7038f8',
  bug: '#a8b820',
  rock: '#b8a038',
  ghost: '#705898',
}

function TypeBadge(props) {

  return (
    <span className={styles.badge}
      style={{ backgroundColor: typeColors[props.type] ?? '#888' }}
    >
      {props.type.charAt(0).toUpperCase() + props.type.slice(1)}
    </span>
  );
}

export default TypeBadge;