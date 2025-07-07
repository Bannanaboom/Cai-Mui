let games = 0;
let turnvar = 1;
let win;
let playerNum = -1;
let chosenNumber = -1;
let choiceStatus = false;
let guessStatus = false;
const choiceButtons = document.querySelectorAll(".playerchoice");
const guessButtons = document.querySelectorAll(".playerguess");
function pinput(pnum){
    playerNum = pnum;
    console.log("Chosen pinput: " + pnum);
}

function binput(){
    const x = [0, 5, 10];
    const y = x[Math.floor(Math.random()*3)]
    console.log("bot input: " + y);
    return y;

}

function chosenNum(cnum){
    chosenNumber = cnum;
    console.log("Chosen Predicted Number: " + cnum);
}
function turn(){
    turnvar *= -1;
    console.log("turn()");
}
function changeText(element, text){
    document.getElementById(element).innerHTML = text;
    console.log("changed text");
}
/*
1 is player, -1 is bot.
False = lose, True = win.
 */
function determineWinner(binput, pinput, chosenNum, turn){
    console.log("Running determineWinner().");
    if (turn == 1){
        if (binput + pinput == chosenNum) {
            win = true;
        }
        else {
            win = false;
        }
    }
    else{
        if (binput + pinput == chosenNum) {
            win = false;
        }
        else {
            win = true;
        }
    }
    console.log("Player wins: " + win);
}
const choicefunc = () => {
        choiceStatus = true
        console.log("choice button clicked. Choice Clicked Status: " + choiceStatus);
    };
    const guessfunc = () => {
        guessStatus = true;
        console.log("Guess button clicked, Guess Clicked Status: " + guessStatus);
    }
function round(){
    choiceButtons.forEach(playerchoice => playerchoice.addEventListener("click", choicefunc));
    guessButtons.forEach(playerguess => playerguess.addEventListener("click", guessfunc));
    console.log("----------------------------");
    win = null;
    console.log("Current turn: " + turnvar);
    buttonsPressed();
    //block other buttons
    console.log("round finished.");
    console.log("Player win: " + win);
}
function reset(){
    console.log("resetting...");
    choiceStatus = guessStatus = false;
    playerNum = chosenNumber = -1;
    //unblock buttons and remove event listeners
    choiceButtons.forEach(playerchoice => {playerchoice.removeEventListener("click", choicefunc)});
    guessButtons.forEach(playerguess => {playerguess.removeEventListener("click", guessfunc)});
    console.log("finished resetting.");
}
/*
function buttonPromise(){
    console.log("---------------------------");
    console.log("Buttonpromise();");
    return new Promise((resolve) =>{
        console.log("Promise created");
        const interval = setInterval(() => {
            console.log("interval running...");
            if (guessStatus && choiceStatus){
                console.log("Interval cleared");
                clearInterval(interval);
                resolve("Promise resolved");
                console.log("Promise resolved.");
            }}, 100);
    });
}
*/
function checkButtons(){
    const intervall = setInterval(() => {
        if (guessStatus && choiceStatus){
            clearInterval(intervall);
            buttonsPressedd();
        }
    }, 200);
}
function buttonsPressedd(){
    determineWinner(binput(), playerNum, chosenNumber, turnvar);
    turn();
    reset();
}
/*
async function buttonsPressed(){
    console.log("-----------------------------");
    console.log("buttonspressed();");
    try {
        console.log("try");
        const response = await buttonPromise();
        console.log("Both buttons pressed.");
        determineWinner(binput(), playerNum, chosenNumber, turnvar);
        turn();
        reset();
    }
    catch{
        console.log("Buttons not pressed." + choiceStatus + guessStatus);
    }
}
*/


function game(){
    while(true){
        console.log("round 1")
        round();
        if(win){
            console.log("round 2");
            changeText("winning status", "Win one more!");
            round();
            if(win){
                changeText("winning status", "You win! :)");
                turn();
                break;
            }
        }
        else{
            console.log("round 2");
            changeText("winning status", "Last Chance..");
            round();
            if(!win){
                changeText("winning status", "You Lose.. :(");
                turn();
                break;
            }
        }
    }
    games++;
}
round();