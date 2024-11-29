function pokemonTemplate(POKEMON) {
    const IMAGE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${POKEMON.id}.png`;

    return `<div class="card-group">
                <div class="card" onclick=" toggleOverlay(${POKEMON.id})">
                    <img src="${IMAGE_URL}" class="card-img-top" alt="${POKEMON.name}" style="background-color:${POKEMON.colorPrimary};" />
                    <div class="card-body">
                        <h5 class="card-title">#${POKEMON.id} ${POKEMON.name}</h5>
                        
                    </div>
                    <div class="card-footer">
                        <small class="text-body-secondary"><p style="background-color: ${POKEMON.colorPrimary};">${POKEMON.abilityPrimary}</p><p id="secondaryAbility" style="background-color: ${POKEMON.colorSecondary};">${POKEMON.abilitySecondary}</p></small>
                    </div>
                </div>`;
}
