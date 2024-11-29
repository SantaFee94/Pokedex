function pokemonTemplate( POKEMON, POKEMON_ID, BG_COLOR_PRIMARY, BG_COLOR_SECONDARY, PRIMARY_TYPE, SECONDARY_TYPE) {
    const IMAGE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${POKEMON_ID}.png`;

    return `<div class="card-group">
                <div class="card" onclick=" toggleOverlay(${POKEMON_ID})">
                    <img src="${IMAGE_URL}" class="card-img-top" alt="${POKEMON.name}" style="background-color:${BG_COLOR_PRIMARY};" />
                    <div class="card-body">
                        <h5 class="card-title">#${POKEMON_ID} ${POKEMON.name}</h5>
                        
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary"><p style="background-color: ${BG_COLOR_PRIMARY};">${PRIMARY_TYPE.ability}</p><p id="secondaryAbility" style="background-color: ${BG_COLOR_SECONDARY};">${SECONDARY_TYPE.ability}</p></small>
                    </div>
                </div>`;
}
