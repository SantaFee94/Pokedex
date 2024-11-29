function searchPokemon() {
    const searchInput = document.getElementById('userSearch').value.toLowerCase();
    const results = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));

    displayResults(results);
}

function displayResults(results) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // Leere den Inhalt

    if (results.length === 0) {
        content.innerHTML = '<p>Keine Pokémon gefunden.</p>';
        return;
    }

    results.forEach(pokemon => {
        const pokemonDiv = document.createElement('div');
        pokemonDiv.innerHTML = `<p>${pokemon.name} (ID: ${pokemon.id})</p>`;
        content.appendChild(pokemonDiv);
    });
}

function showSuggestions() {
    const searchInput = document.getElementById('userSearch').value.toLowerCase();
    const suggestionsDiv = document.getElementById('suggestions');
    suggestionsDiv.innerHTML = ''; // Leere die bisherigen Vorschläge

    if (searchInput.length === 0) {
        return; // Keine Vorschläge anzeigen, wenn das Eingabefeld leer ist
    }

    const filteredPokemon = allPokemon.filter(pokemon => pokemon.name.toLowerCase().includes(searchInput));

    filteredPokemon.forEach(pokemon => {
        const suggestionItem = document.createElement('div');
        suggestionItem.classList.add('suggestion-item');
        suggestionItem.innerText = pokemon.name;
        suggestionItem.onclick = () => selectSuggestion(pokemon.name);
        suggestionsDiv.appendChild(suggestionItem);
    });
}

function selectSuggestion(pokemonName) {
    const searchInput = document.getElementById('userSearch');
    searchInput.value = pokemonName; // Setze den Wert des Eingabefelds auf den ausgewählten Vorschlag
    document.getElementById('suggestions').innerHTML = ''; // Leere die Vorschläge
}