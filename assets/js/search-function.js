function searchPokemon(event) {
    let searchInput = event.target.value.toLowerCase();

    if (searchInput.length < 3) {
        return;
    }
    const results = GLOBAL_ALL_POKEMONS.filter((pokemon) => pokemon.name.toLowerCase().includes(searchInput)).slice(0, 10);
    renderPokemons(results);
}
