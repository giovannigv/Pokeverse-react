import { createContext, useContext, useReducer } from 'react'

const initialState = {
  favorites: [],
  trainer: null,
  theme: 'light',
}

export const ACTIONS = {
  TOGGLE_FAVORITE: 'TOGGLE_FAVORITE',
  SET_TRAINER: 'SET_TRAINER',
  TOGGLE_THEME: 'TOGGLE_THEME',
  CLEAR_FAVORITES: 'CLEAR_FAVORITES',
}


// ── Reducer ─────────────────────────────────────
function reducer(state, action) {
  switch (action.type) {
    case ACTIONS.TOGGLE_FAVORITE: {
      const id = action.payload;
      const already = state.favorites.includes(id);
      return {
        ...state,
        favorites: already ? state.favorites.filter(fav => fav !== id) : [...state.favorites, id]
      }
    }

    case ACTIONS.SET_TRAINER: {
      return {
        ...state,
        trainer: action.payload
      }
    }

    case ACTIONS.TOGGLE_THEME: {
      return {
        ...state,
        theme: state.theme === 'light' ? 'dark' : 'light'
      }
    }

    case ACTIONS.CLEAR_FAVORITES: {
      return {
        ...state,
        favorites: []
      }
    }

    default: {
      return state;
    }
  }
}

// ── Context ─────────────────────────────────────
const PokeverseContext = createContext(null);

// ── Provider ───────────────────────────────────
export function PokeverseProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PokeverseContext.Provider value={{ state, dispatch }}>
      {children}
    </PokeverseContext.Provider>
  )
}

// ── Custom Hook ───────────────────────────────
export function usePokeverse() {
  const context = useContext(PokeverseContext);

  if (!context) {
    throw new Error('usePokeverse must be used within a PokeverseProvider');
  }

  return context;
}