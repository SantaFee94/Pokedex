async function renderPokemonCardById(id) {
    toggleOverlay("loading-overlay", "visible");

    const POKEMON = await fetchPokemonDetails(`${BASE_URL}/${id}/`);

    currentPokemonDetails.push(POKEMON);
    await getPokemoCardTypeColors();
}

async function showPokemnonCard(id) {
    currentPokemonDetails = [];
    let cardContentRef = document.getElementById("card-overlay-content");
    cardContentRef.innerHTML = "";

    await renderPokemonCardById(id);
    await fetchPokemonEvoChain(id);
    cardContentRef.innerHTML = pokemonDetailsCardToHtmlTemplate(currentPokemonDetails);

    toggleOverlay("loading-overlay", "hidden");
    toggleOverlay("card-overlay", "visible");
}

async function getPokemoCardTypeColors() {
    const BG_COLOR_PRIMARY = TYPE_COLORS[currentPokemonDetails[0].types[0].type.name] || "#429937";
    const BG_COLOR_SECONDARY = TYPE_COLORS[currentPokemonDetails[0].types[1]?.type.name] || "";
    currentPokemonDetails.push({ bgColorPrimary: BG_COLOR_PRIMARY, bgColorSecondary: BG_COLOR_SECONDARY });
}

async function showPokemonDetails(event, action) {
    event.stopPropagation();
    let infoContainerRef = document.getElementById("pokemon-info");
    infoContainerRef.innerHTML = "";

    switch (action) {
        case "main":
            infoContainerRef.innerHTML = pokemonMainInfoTemplate(currentPokemonDetails);
            break;
        case "stats":
            infoContainerRef.innerHTML = pokemonStatsInfoTemplate(currentPokemonDetails);
            break;
        case "evoChain":
            infoContainerRef.innerHTML = pokemonEvoChainInfoTemplate(currentPokemonDetails);
            break;
        default:
            console.log("Unbekannte Aktion");
    }
}

async function fetchPokemonEvoChain(id) {
    const URL = `https://pokeapi.co/api/v2/pokemon/${id}`;
    try {
        const RESPONSE = await fetch(URL);
        if (RESPONSE.ok) {
            const POKEMON_DATA = await RESPONSE.json();
            const SPECIES_RESPONSE = await fetch(POKEMON_DATA.species.url);
            const SPECIES_DATA = await SPECIES_RESPONSE.json();
            const EVO_CHAIN_URL = await fetch(SPECIES_DATA.evolution_chain.url);
            const EVO_CHAIN_URL_RESPONSE = await EVO_CHAIN_URL.json();

            currentPokemonDetails.push({ evoChain: EVO_CHAIN_URL_RESPONSE.chain });
        } else {
            throw new Error(`Fehler beim Abrufen der Pokémon-Daten für ID: ${id}`);
        }
    } catch (error) {
        console.error("Fehler beim Abrufen der Evolutionskette:", error);
    }
}

async function pokemonCardOverlayForward(id) {
    let newPokemonId = id + 1;
    currentPokemonDetails = [];
    await showPokemnonCard(newPokemonId);
}

async function pokemonCardOverlayBackward(id) {
    let newPokemonId = id;
    if (newPokemonId == 1) {
        return;
    } else {
        newPokemonId = id - 1;
    }

    await showPokemnonCard(newPokemonId);
}
