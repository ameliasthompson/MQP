function main() {
    var workspace = document.getElementById('workspace');

    setupDisclaimer();
}

function consentListener() {
    var agefieldval = document.getElementById('agefield').value;

    // Bounds check and check for consent
    if (agefieldval != null && agefieldval > 0
        && document.getElementById('consentbox').checked) {
            document.getElementById('continuebutton').disabled = false;
        
    } else {
        document.getElementById('continuebutton').disabled = true;
    }
}

function setupDisclaimer() {
    var agefield = document.getElementById('agefield');
    var consentbox = document.getElementById('consentbox');

    // Make sure these are all set correctly.
    agefield.value = null;
    consentbox.checked = false;
    document.getElementById('continuebutton').disabled = true;

    // Register listeners.
    agefield.addEventListener('keyup', consentListener);
    consentbox.addEventListener('change', consentListener);

    document.getElementById('disclaimer').hidden = false;
}