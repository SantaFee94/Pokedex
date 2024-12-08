function toggleOverlay(id, visibility) {
    document.getElementById(id).style.visibility = visibility;
    if (visibility === 'visible') {
        document.body.classList.add('no-scroll'); // Scrollen deaktivieren
    } else {
        document.body.classList.remove('no-scroll'); // Scrollen aktivieren
    }
}

function showOverlay() {
    document.getElementById("loading-overlay").style.visibility = "visible";
    document.getElementById("card-overlay").style.visibility = "visible";
}

function hideOverlay() {
    document.getElementById("loading-overlay").style.visibility = "hidden";
    document.getElementById("card-overlay").style.visibility = "hidden";
}