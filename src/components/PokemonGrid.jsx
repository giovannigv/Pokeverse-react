import PokemonCard from "./PokemonCard";
import style from "./PokemonGrid.module.css"

function PokemonGrid({ pokemons, children, favorites, onToggleFavorite }) {
  return (
    <div>
      {children}
      <div className={style.cardsGrid}>
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} {...pokemon}
            isFavorite={favorites.includes(pokemon.id)}
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonGrid;