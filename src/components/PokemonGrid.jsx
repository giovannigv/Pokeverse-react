import { usePokeverse, ACTIONS } from "../context/PokeverseContext";

import PokemonCard from "./PokemonCard";
import style from "./PokemonGrid.module.css"

function PokemonGrid({ pokemons, children }) {

  const { state, dispatch } = usePokeverse();

  return (
    <div>
      {children}
      <div className={pokemons.length === 0 ? '' : style.cardsGrid}>
        {pokemons.length === 0 ? <h2>No pokemons found</h2> : null}
        {pokemons.map(pokemon => (
          <PokemonCard key={pokemon.id} {...pokemon}
            isFavorite={state.favorites.includes(pokemon.id)}
            onToggleFavorite={(id) => dispatch({ type: ACTIONS.TOGGLE_FAVORITE, payload: id })}
          />
        ))}
      </div>
    </div>
  );
}

export default PokemonGrid;