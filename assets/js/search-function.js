function searchPokemon() {
    const searchInput = document.getElementById("userSearch").value.toLowerCase();
    const results = GLOBAL_ALL_POKEMONS.filter((pokemon) => pokemon.name.toLowerCase().includes(searchInput));

    renderPokemons(results);
}


