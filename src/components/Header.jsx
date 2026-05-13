function Header({ favoritesCount }) {
  return (
    <header>
      <h1>Pokeverse</h1>
      <h2>Your complete Pokédex</h2>
      <p>Favorites: {favoritesCount}</p>
    </header>
  );
}

export default Header;