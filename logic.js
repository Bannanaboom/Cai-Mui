let games = 0;
let turnvar = 1;
let win;
let playerNum = -1;
let chosenNumber = -1;
let choiceStatus = false;
let guessStatus = false;
let playerWins = 0;
let botWins = 0;
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
    changeText("botChoice", "Bot choice: " + y);
    return y;

}

function chosenNum(cnum){
    chosenNumber = cnum;
    console.log("Chosen Predicted Number: " + cnum);
}
/*
1 is player, -1 is bot.
False = lose, True = win.
 */
function turn(){
    turnvar *= -1;
    if (turnvar > 0){
        changeText("turn", "Turn: Player");
    }
    else {
        changeText("turn", "Turn: Bot");
    }
    console.log("turn()");
}
function changeText(id, text){
    document.getElementById(id).innerHTML = text;
    console.log("changed text");
}
function changeImg(id, pic){
    document.getElementById(id).src = pic;
}
function hideImg(id, hide){
    if (hide){
       document.getElementById(id).style.display = "none";
        console.log("Pictures hidden");
    }
    else {
        document.getElementById(id).style.display = "";
        console.log("Pictures shown");
    }
}
function disableChoiceButton(disable){
    if (disable){
        choiceButtons.forEach(playerchoice => {
            playerchoice.disabled = true;
        });
    }
    else {
        choiceButtons.forEach(playerchoice => {
            playerchoice.disabled = false;
        });
    }
}
function disableGuessButton(disable){
    if (disable){
        guessButtons.forEach(playerguess => {
            playerguess.disabled = true;
        });
    }
    else {
        guessButtons.forEach(playerguess => {
            playerguess.disabled = false;
        });
    }
}


function determineWinner(binput, pinput, chosenNum, turn){
    console.log("Running determineWinner().");
    if (turn == 1){
        if (binput + pinput == chosenNum) {
            win = true;
            changeImg('TW', 'TWwin.jpg');
            playerWins++;
        }
        else {
            win = false;
            changeImg('TW', 'TWlose.jpg');
            botWins++;
        }
    }
    else{
        if (binput + pinput == chosenNum) {
            win = false;
            changeImg('TW', 'TWlose.jpg');
            botWins++;
        }
        else {
            win = true;
            changeImg('TW', 'TWwin.jpg');
            playerWins++;
        }
    }
    console.log("Player wins: " + win);
}
const choicefunc = () => {
    disableChoiceButton(true);
    choiceStatus = true
    changeText("playersChoice", "Player choice: " + playerNum);
};
const guessfunc = () => {
    disableGuessButton(true);
    guessStatus = true;
    changeText("playersguess", "Player guess: " + chosenNumber);
}
function round(){
    choiceButtons.forEach(playerchoice => playerchoice.addEventListener("click", choicefunc));
    guessButtons.forEach(playerguess => playerguess.addEventListener("click", guessfunc));
    hideImg("TW", true);
    console.log("----------------------------");
    win = null;
    console.log("Current turn: " + turnvar);
    checkButtons();
}
function clearWords(){
    changeText("winning status", "");
    changeText("playersChoice", "Player choice: ");
    changeText("botChoice", "Bot choice: ");
    changeText("playersguess", "Player guess: ");
}
function reset(){
    console.log("resetting...");
    choiceStatus = guessStatus = false;
    playerNum = chosenNumber = -1;
    //unblock buttons and remove event listeners
    choiceButtons.forEach(playerchoice => {playerchoice.removeEventListener("click", choicefunc)});
    guessButtons.forEach(playerguess => {playerguess.removeEventListener("click", guessfunc)});
    clearWords();
    hideImg("TW", true);
    disableChoiceButton(false);
    disableGuessButton(false);
    console.log("finished resetting.");
}

function checkButtons(){
    const interval = setInterval(() => {
        if (guessStatus && choiceStatus){
            clearInterval(interval);
            console.log("both buttons pressed");
            buttonsPressed();

        }
    }, 200);
}
function delay(){
    turn();
    reset();
    console.log("round finished.");
    games++;
    round();
}
function buttonsPressed(){
    determineWinner(binput(), playerNum, chosenNumber, turnvar);
    hideImg("TW", false);
    checkRounds();
    setTimeout(delay, 2000);
}
//TODO: Let player choose how many rounds to play to win the game 
function checkRounds(){
    if(win){
        changeText("winning status", "You Win!")
    }
    else if(!win){
        changeText('winning status', "You lose..");
    }
    else {
        changeText("winning status", "Winning status: ERROR");
        console.log("ERROR: " + win + botWins + playerWins);
    }
    changeText("rounds", "Total rounds: " + games);
}
round();