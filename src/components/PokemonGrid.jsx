import PokemonCard from "./PokemonCard";
import style from "./PokemonGrid.module.css"

function PokemonGrid({ pokemons, children, favorites, onToggleFavorite }) {
  return (
    <div>
      {children}
      <div className={pokemons.length === 0 ? '' : style.cardsGrid}>
        {pokemons.length === 0 ? <h2>No pokemons found</h2> : null}
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