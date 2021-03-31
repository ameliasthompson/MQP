function main() {
    var workspace = document.getElementById('workspace');

    setupDisclaimer();
}

function setupDisclaimer() {
    // Make sure these are all set correctly.
    document.getElementById('agefield').value = null;
    document.getElementById('consentbox').checked = false;
    document.getElementById('continuebutton').disabled = true;

    document.getElementById('disclaimer').hidden = false;
}