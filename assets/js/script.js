const BASE_URL = "https://pokeapi.co/api/v2/pokemon";
let limit = 20;
let offset = 0;
let allPokemon = [];
const TYPE_COLORS = {
    fire: "#f05430",
    water: "#6890F0",
    grass: "#55a62d",
    electric: "#F8D030",
    ground: "#E0C068",
    rock: "#B8A038",
    fairy: "#EE99AC",
    poison: "#A040A0",
    bug: "#A8B820",
    dragon: "#7038F8",
    psychic: "#F85888",
    flying: "#A890F0",
    fighting: "#C03028",
    ghost: "#705898",
    ice: "#98D8D8",
    steel: "#B8B8D0",
    dark: "#705848",
    normal: "#A8A878",
};

async function init() {
    showLoadingOverlay()
    await fetchPokemonData();
    renderPokemons();
    
}

async function fetchPokemonData() {
    try {
        const URL = `${BASE_URL}?limit=${limit}&offset=${offset}`;
        const RESPONSE = await fetch(URL);
        if (RESPONSE.ok) {
            const DATA = await RESPONSE.json();
            allPokemon = allPokemon.concat(DATA.results);
        } else {
            throw new Error("Failed to fetch Pokémon data");
        }
    } catch (error) {
        console.error("Error while loading:", error);
    }
}

async function renderPokemons() {
    const contentRef = document.getElementById("content");
    contentRef.innerHTML = "";
    const fragment = document.createDocumentFragment();

    for (const [index, POKEMON] of allPokemon.entries()) {
        try {
            const DETAILS = await fetchPokemonDetails(POKEMON.url);
            const { PRIMARY_TYPE, SECONDARY_TYPE, BG_COLOR_PRIMARY, BG_COLOR_SECONDARY } = getPokemonTypeColors(DETAILS);
            const POKEMON_NAME = capitalizeFirstLetter(POKEMON.name);
            const POKEMON_ID = getPokemonIdFromUrl(POKEMON.url);
            const DIV = createPokemonElement(index, POKEMON_NAME, POKEMON_ID, BG_COLOR_PRIMARY, BG_COLOR_SECONDARY, PRIMARY_TYPE, SECONDARY_TYPE);
            fragment.appendChild(DIV);
        } catch (error) {
            console.error("Error fetching Pokémon details:", error);
        }
    }
    
    contentRef.innerHTML = hideLoadingOverlay();
    contentRef.appendChild(fragment);
}

async function fetchPokemonDetails(url) {
    const POKEMON_ID = getPokemonIdFromUrl(url);
    const RESPONSE = await fetch(`https://pokeapi.co/api/v2/pokemon/${POKEMON_ID}`);
    if (!RESPONSE.ok) throw new Error(`Failed to fetch details for Pokémon ID: ${POKEMON_ID}`);
    return await RESPONSE.json();
}

function getPokemonTypeColors(DETAILS) {
    const PRIMARY_TYPE = capitalizeFirstLetter(DETAILS.types[0].type.name);
    const SECONDARY_TYPE = DETAILS.types[1] ? capitalizeFirstLetter(DETAILS.types[1].type.name) : "";
    const BG_COLOR_PRIMARY = TYPE_COLORS[PRIMARY_TYPE.toLowerCase()] || "#429937";
    const BG_COLOR_SECONDARY = SECONDARY_TYPE ? TYPE_COLORS[SECONDARY_TYPE.toLowerCase()] || "#429937" : "";

    return { PRIMARY_TYPE, SECONDARY_TYPE, BG_COLOR_PRIMARY, BG_COLOR_SECONDARY };
}

function createPokemonElement(index,POKEMON_NAME, POKEMON_ID, BG_COLOR_PRIMARY, BG_COLOR_SECONDARY, PRIMARY_TYPE, SECONDARY_TYPE) {
    const DIV = document.createElement("div");
    DIV.innerHTML = pokemonTemplate(
        { name: POKEMON_NAME },
        POKEMON_ID,
        BG_COLOR_PRIMARY,
        BG_COLOR_SECONDARY,
        { ability: PRIMARY_TYPE },
        { ability: SECONDARY_TYPE }
    );
    return DIV;
}

function getPokemonIdFromUrl(url) {
    const PARTS = url.split("/");
    return PARTS[PARTS.length - 2];
}

function capitalizeFirstLetter(string) {
    if (string.length === 0) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
}
async function loadMorePokemon() {
    offset += 15;
    init();
}


