function pokemonToHtmlTemplate(POKEMON) {
    const IMAGE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${POKEMON.id}.png`;
    const ability2 = POKEMON.abilitySecondary ? POKEMON.abilitySecondary : null;
    let typesPElement = "";
    if (ability2) {
        typesPElement += `<p id="secondaryAbility" style="background-color: ${POKEMON.colorSecondary};">${ability2}</p>`;
    }

    return `
        <div class="card-group">
            <div class="card" onclick="showPokemnonCard(${POKEMON.id})">
                <img src="${IMAGE_URL}" class="card-img-top" alt="${POKEMON.name}" style="background-color:${POKEMON.colorPrimary};" />
                <div class="card-body">
                    <h5 class="card-title">#${POKEMON.id} ${POKEMON.name}</h5>
                </div>
                <div class="card-footer">
                    <small class="text-body-secondary">
                        <p style="background-color: ${POKEMON.colorPrimary};">${POKEMON.abilityPrimary}</p>
                        ${typesPElement}
                    </small>
                </div>
            </div>
        </div>`;
}

function pokemonDetailsCardToHtmlTemplate(POKEMON) {
    const primaryType = POKEMON[0].types[0].type.name;
    const secondaryType = POKEMON[0].types[1] ? POKEMON[0].types[1].type.name : null;
    const IMAGE_URL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${POKEMON[0].id}.png`;

    let typesH3Element = "";
    if (secondaryType) {
        typesH3Element += `<h3 style="background-color:${POKEMON[1].bgColorSecondary}">${capitalizeFirstLetter(secondaryType)}</h3>`;
    }

    return `
        <div class="card-group">
            <div class="pokemon-card" onclick="showPokemnonCard(${POKEMON[0].id})">
                <h2 class="pokemon-card-title">#${POKEMON[0].id} ${capitalizeFirstLetter(POKEMON[0].name)}</h2>
                <img src="${IMAGE_URL}" class="card-img-top" alt="${capitalizeFirstLetter(POKEMON[0].name)}" style="background-color:${
        POKEMON[1].bgColorPrimary
    };"/>
                <div class="card-body">
                    <div class="pokemon-card-type">
                        <h3 style="background-color:${POKEMON[1].bgColorPrimary}">${capitalizeFirstLetter(primaryType)} ${typesH3Element}</h3>
                    </div>
                    <div class="pokemon-card-info-nav-bar">
                        <button class="" onclick="showPokemonDetails(event, 'main', ${POKEMON[0].id})">main</button>
                        <button class="" onclick="showPokemonDetails(event, 'stats', ${POKEMON[0].id})">stats</button>
                        <button class="" onclick="showPokemonDetails(event, 'evoChain', ${POKEMON[0].id})">evo chain</button>
                    </div>
                    <div id="pokemon-info"></div>
                </div>
                <div class="card-overlay-footer">
                <button onclick="pokemonCardOverlayBackward(${POKEMON[0].id})" class="button"><img class="button-img" src="./assets/img/icon/arow-left.png" alt=""></button><button onclick="pokemonCardOverlayForward(${POKEMON[0].id})"><img class="button-img" src="./assets/img/icon/arow-right.png"></button></div>
            </div>
        </div>
    `;
}

function pokemonMainInfoTemplate(POKEMON) {
    const height = (POKEMON[0].height / 10).toFixed(2);
    const weight = (POKEMON[0].weight / 10).toFixed(2);
    const baseExperience = POKEMON[0].base_experience;
    const ability1 = capitalizeFirstLetter(POKEMON[0].abilities[0].ability.name);
    const ability2 = capitalizeFirstLetter(POKEMON[0].abilities[1] ? POKEMON[0].abilities[1].ability.name : "");

    return `
        <table class="pokemon-detail-table">
            <tr>
                <td>Height:</td>
                <td>${height} m</td>
            </tr>
            <tr>
                <td>Weight:</td>
                <td>${weight} kg</td>
            </tr>
            <tr>
                <td>Base Experience:</td>
                <td>${baseExperience}</td>
            </tr>
            <tr>
                <td>Abilities:</td>
                <td>${ability1}, ${ability2}</td>
            </tr>
        </table>
    `;
}

function pokemonStatsInfoTemplate(POKEMON) {
    const stats = POKEMON[0].stats;

    return `
        <div class="pokemon-stats">
            <p>HP: ${stats[0].base_stat}</p>
            <div class="progress" role="progressbar">
                <div class="progress-bar" style="width: ${stats[0].base_stat}%"></div>
            </div>

            <p>Attack: ${stats[1].base_stat}</p>
            <div class="progress" role="progressbar">
                <div class="progress-bar" style="width: ${stats[1].base_stat}%"></div>
            </div>

            <p>Defense: ${stats[2].base_stat}</p>
            <div class="progress" role="progressbar">
                <div class="progress-bar" style="width: ${stats[2].base_stat}%"></div>
            </div>

            <p>Special Attack: ${stats[3].base_stat}</p>
            <div class="progress" role="progressbar">
                <div class="progress-bar" style="width: ${stats[3].base_stat}%"></div>
            </div>

            <p>Special Defense: ${stats[4].base_stat}</p>
            <div class="progress" role="progressbar">
                <div class="progress-bar" style="width: ${stats[4].base_stat}%"></div>
            </div>

            <p>Speed: ${stats[5].base_stat}</p>
            <div class="progress" role="progressbar">
                <div class="progress-bar" style="width: ${stats[5].base_stat}%"></div>
            </div>
        </div>
    `;
}

function pokemonEvoChainInfoTemplate(POKEMON) {
    const evoChain = POKEMON[2].evoChain;

    const EVO_STAGE_1 = evoChain && evoChain.species 
        ? getPokemonIdFromUrl(evoChain.species.url) 
        : null;

    const EVO_STAGE_2 = evoChain && evoChain.evolves_to && evoChain.evolves_to[0] 
        ? getPokemonIdFromUrl(evoChain.evolves_to[0].species.url) 
        : null;

    const EVO_STAGE_3 = evoChain && evoChain.evolves_to && evoChain.evolves_to[0] && evoChain.evolves_to[0].evolves_to && evoChain.evolves_to[0].evolves_to[0] 
        ? getPokemonIdFromUrl(evoChain.evolves_to[0].evolves_to[0].species.url) 
        : null;

    const IMAGE_URL_1 = EVO_STAGE_1 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${EVO_STAGE_1}.png` : '';
    const IMAGE_URL_2 = EVO_STAGE_2 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${EVO_STAGE_2}.png` : '';
    const IMAGE_URL_3 = EVO_STAGE_3 ? `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${EVO_STAGE_3}.png` : '';

    return `
        <div class="evo-chain-img-container">
            ${EVO_STAGE_1 ? `<h3>1. ${capitalizeFirstLetter(evoChain.species.name)}</h3><img class='evo-chain-img' src='${IMAGE_URL_1}' alt='${EVO_STAGE_1}' onclick="showPokemnonCard(${EVO_STAGE_1})">` : ''}
            ${EVO_STAGE_2 ? `<h3>2. ${capitalizeFirstLetter(evoChain.evolves_to[0].species.name)} </h3><img class='evo-chain-img' src='${IMAGE_URL_2}' alt='${EVO_STAGE_2}' onclick="showPokemnonCard(${EVO_STAGE_2})">` : ''}
            ${EVO_STAGE_3 ? `<h3>3. ${capitalizeFirstLetter(evoChain.evolves_to[0].evolves_to[0].species.name)} </h3><img class='evo-chain-img' src='${IMAGE_URL_3}' alt='${EVO_STAGE_3}' onclick="showPokemnonCard(${EVO_STAGE_3})">` : ''}
        </div> 
    `;
}
