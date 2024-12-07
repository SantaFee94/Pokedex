function toggleOverlay(id, visibility) {
    document.getElementById(id).style.visibility = visibility;
}

function showOverlay() {
    document.getElementById("loading-overlay").style.visibility = "visible";
    document.getElementById("card-overlay").style.visibility = "visible";
    if (toggleOverlay('card-overlay', 'hidden' ) == true) {
        currentPokemonDetails = []
    }
    
}

function hideOverlay() {
    document.getElementById("loading-overlay").style.visibility = "hidden";
    document.getElementById("card-overlay").style.visibility = "hidden";
}
