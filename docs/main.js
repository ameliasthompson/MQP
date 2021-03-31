var red = 0;
var green = 0;
var blue = 0;
var black = 0;

function main() {
    var workspace = document.getElementById('workspace');

    // Assign values to each color (static for now, but random later)
    red = 1;
    green = 7;
    blue = 2;
    black = 8;

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

function setupLearning() {
    document.getElementById('disclaimer').hidden = true;

    // Label each color
    var labels = document.getElementsByClassName('collabel');
    labels[0].textContent = red.toString() + " = ";
    labels[0].textContent = green.toString() + " = ";
    labels[0].textContent = blue.toString() + " = ";
    labels[0].textContent = black.toString() + " = ";

    // Show first association
    var associations = document.getElementsByClassName('association');
    associations[0].hidden = false;

    document.getElementById('learning').hidden = false;
}