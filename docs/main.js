var red = 0;
var green = 0;
var blue = 0;
var black = 0;

var bigcontinue = false;
var colorednumber = false;
var cartoon = false;
var continuous = false;

var trials = [];
var curTrial = 0;
var beginTrial;

function main() {
    var workspace = document.getElementById('workspace');

    // Assign unique values to each color
    do {
        red = Math.floor(Math.random()*10);
        green = Math.floor(Math.random()*10);
        blue = Math.floor(Math.random()*10);
        black = Math.floor(Math.random()*10);
    } while (red == green || red == blue || red == black
            || green == blue || green == black
            || blue == black);
    
    // Randomly select flags
    bigcontinue = Math.random() < 0.5;
    colorednumber = Math.random() < 0.5;
    cartoon = Math.random() < 0.5;
    continuous = Math.random() < 0.5;

    // Randomly set trials
    for (var i = 0; i < 30; i++) {
        var trial;
        do {
            var num = getRandomColorNum()
            trial = {
                "coltrial": Math.random() < 0.5, // true if color first false if number first
                "num": num,
                "color": getColorFromNum(num),
                "response": -1 // number of milliseconds
            }
        } while (i > 0 && num == trials[i-1]["num"]);

        trials.push(trial);
    }

    setupDisclaimer();
}

function getRandomColorNum() {
    rand = Math.random()*4;
    if (rand < 1) {
        return red;
    } else if (rand < 2) {
        return green;
    } else if (rand < 3) {
        return blue;
    } else {
        return black;
    }
}

function getColorFromNum(n) {
    if (n == red) {
        return "red";
    } else if (n == green) {
        return "green";
    } else if (n == blue) {
        return "blue";
    } else if (n == black) {
        return "black";
    } else {
        return "error";
    }
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

    if (colorednumber) {
        labels[0].setAttribute('style', "color: red");
        labels[1].setAttribute('style', "color: green");
        labels[2].setAttribute('style', "color: blue");
        labels[3].setAttribute('style', "color: black");
    }

    // Get elements
    var associations = document.getElementsByClassName('association');
    var forwbutton = document.getElementById('forwardbutton');
    var backbutton = document.getElementById('backbutton')
    
    if (bigcontinue) {
        forwbutton.setAttribute('style', "color: white; background-color: green; font-size: 200%;");
    }

    if (!continuous) {
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
                setupTest();
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

    } else {
        // Show all associations
        associations[0].hidden = false;
        associations[1].hidden = false;
        associations[2].hidden = false;
        associations[3].hidden = false;

        // Set up continue button
        forwbutton.textContent = "Finish";
        forwbutton.addEventListener('click', () => {
            setupTest();
        })

        // Disable back button because it isn't actually used in this mode
        backbutton.disabled = true;
    }

    document.getElementById('learning').hidden = false;
}

function testButtonListener() {
    // Record results of this trial
    trials[curTrial]["response"] = new Date().getTime() - beginTrial;

    // Set up the next trial
    curTrial++;
    if (curTrial < 30) {
        var box = document.getElementById('testbox');
        if (trials[curTrial]["coltrial"]) {
            // Color first
            box.textContent = "";
            box.setAttribute('style', "background-color: " + trials[curTrial]["color"]);
            document.getElementById('numbuttons').hidden = false;
            document.getElementById('colbuttons').hidden = true;

        } else {
            // Number first
            box.textContent = trials[curTrial]["num"];
            box.setAttribute('style', "background-color: white");
            document.getElementById('numbuttons').hidden = true;
            document.getElementById('colbuttons').hidden = false;
        }
    } else {
        // Proceed to results
    }

    // Start timer for next trial
    beginTrial = new Date().getTime();
}

function setupTest() {
    document.getElementById('learning').hidden = true;

    // Set up first trial
    var box = document.getElementById('testbox');
    if (trials[0]["coltrial"]) {
        // Color first
        box.textContent = "";
        box.setAttribute('style', "background-color: " + trials[0]["color"]);
        document.getElementById('numbuttons').hidden = false;
        document.getElementById('colbuttons').hidden = true;

    } else {
        // Number first
        box.textContent = trials[0]["num"];
        box.setAttribute('style', "background-color: white");
        document.getElementById('numbuttons').hidden = true;
        document.getElementById('colbuttons').hidden = false;
    }

    // Set up listeners
    document.getElementById('but1').addEventListener('click', testButtonListener);
    document.getElementById('but2').addEventListener('click', testButtonListener);
    document.getElementById('but3').addEventListener('click', testButtonListener);
    document.getElementById('but4').addEventListener('click', testButtonListener);
    document.getElementById('but5').addEventListener('click', testButtonListener);
    document.getElementById('but6').addEventListener('click', testButtonListener);
    document.getElementById('but7').addEventListener('click', testButtonListener);
    document.getElementById('but8').addEventListener('click', testButtonListener);
    document.getElementById('but9').addEventListener('click', testButtonListener);
    document.getElementById('but0').addEventListener('click', testButtonListener);
    document.getElementById('butred').addEventListener('click', testButtonListener);
    document.getElementById('butgreen').addEventListener('click', testButtonListener);
    document.getElementById('butblue').addEventListener('click', testButtonListener);
    document.getElementById('butblack').addEventListener('click', testButtonListener);

    // Start timer for first trial
    beginTrial = new Date().getTime();

    document.getElementById('testing').hidden = false;
}