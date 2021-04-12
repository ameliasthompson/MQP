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
    if (agefieldval != null && agefieldval >= 13
        && document.getElementById('consentbox').checked) {
            document.getElementById('continuebutton').disabled = false;
        
    } else {
        document.getElementById('continuebutton').disabled = true;
    }
}

function setupDisclaimer() {
    var agefield = document.getElementById('agefield');
    var consentbox = document.getElementById('consentbox');
    var contbutton = document.getElementById('continuebutton');

    // Make sure these are all set correctly.
    agefield.value = null;
    consentbox.checked = false;
    contbutton.disabled = true;

    // Register listeners.
    agefield.addEventListener('keyup', consentListener);
    consentbox.addEventListener('change', consentListener);

    contbutton.addEventListener('click', () => {
        setupLearning();
    })


    document.getElementById('disclaimer').hidden = false;
}

function setupLearning() {
    document.getElementById('disclaimer').hidden = true;

    // Label each color
    var labels = document.getElementsByClassName('collabel');
    labels[0].textContent = red.toString() + " = ";
    labels[1].textContent = green.toString() + " = ";
    labels[2].textContent = blue.toString() + " = ";
    labels[3].textContent = black.toString() + " = ";

    // Set up buttons
    var associations = document.getElementsByClassName('association');
    var forwbutton = document.getElementById('forwardbutton');
    var backbutton = document.getElementById('backbutton')
    var assocNum = 0;
    var totAssoc = 4;

    forwbutton.addEventListener('click', () => {
        assocNum++;
        if (assocNum < totAssoc) {
            // Show next association
            associations[assocNum-1].hidden = true;
            associations[assocNum].hidden = false;

            // Change the text on the button if we're on the last one
            if (assocNum == totAssoc - 1) {
                forwbutton.textContent = "Finish";
            }

            // Enable the back button
            backbutton.disabled = false;

        } else {
            // Continue to testing phase
        }
    });

    backbutton.addEventListener('click', () => {
        if (assocNum > 0) {
            assocNum--;

            // Show previous association
            associations[assocNum+1].hidden = true;
            associations[assocNum].hidden = false;

            // Disable the back button if we're on the first one
            if (assocNum == 0) backbutton.disabled = true;

            // Change the text on the continue button if it's been changed
            forwbutton.textContent = "Continue";
        
        } else {
            print("Back button should be disabled if you're on the first association!");
        }
    });

    // Show first association
    associations[0].hidden = false;

    document.getElementById('learning').hidden = false;
}