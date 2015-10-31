var arrayOfBricks = [];
var arrayCounter = 0;
var counter = 0;
var limit = 15;
var snd = new Audio("ding.mp3");

function start() {
    if (arrayCounter == arrayOfBricks.length) {
        arrayCounter = 0;
        arrayOfBricks.push(Math.floor(Math.random() * 9));
        showBricks();
    }
}

function superFunTimesAwaitsYou(num) {
    counter = num;
    start();
}

function check() {
    var number = parseInt(this.id.substring("brick".length), 10);

    var message = "";
    if (arrayOfBricks[arrayCounter] == number) {
        arrayCounter++;
        if (arrayCounter == arrayOfBricks.length) {
            snd.play();
            counter++;
            if (counter < limit) {
                setTimeout(start, 1300);
            } else {
                counter = 0;
                arrayOfBricks = [];
                arrayCounter = 0;
                message = "Yay!";
            }
        }
    } else {
        message = "Pr&oslash;v igen!";
        replay();
    }
    document.getElementById("errorMessage").innerHTML = message;
}

function replay() {
    arrayCounter = 0;
    setTimeout(showBricks, 500);
}

function showBricks() {
    var index = 0,
        on, off, disableEm, enableEm;
    on = function () {
        disableEm();
        document.getElementById("brick" + arrayOfBricks[index]).className = "on";
        setTimeout(off, 500);
    };

    off = function () {
        document.getElementById("brick" + arrayOfBricks[index]).className = "off";
        index++;
        if (index < arrayOfBricks.length) {
            setTimeout(on, 500);
        } else {
            enableEm();
        }
    };
    disableEm = function () {
        for (var i = 0; i < 9; i++) {
            document.getElementById("brick" + i).onclick = null;
        }
        document.body.className = "";
    };

    enableEm = function () {
        for (var i = 0; i < 9; i++) {
            document.getElementById("brick" + i).onclick = check;
        }
        document.body.className = "readySetGo";
    };
    on();
}
