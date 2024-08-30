let buttonColors = ["red", "blue", "green", "yellow"];
let gamePattern = [];
let userClickPattern = [];


/* --------------------------------------------------------------------------------------- */


let level = 0;
let started = false;

$(document).keydown(function () {
    if (!started) {
        $("#level-title").text("level " + level);
        nextSequence();
        started = true;
    }
});

/* --------------------------------------------------------------------------------------- */




$(".btn").on("click", function () {
    let userChosenColour = $(this).attr("id");
    userClickPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickPattern.length-1);
});


/* --------------------------------------------------------------------------------------- */


function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickPattern[currentLevel]){

            console.log("Off You Go!!");

        if(gamePattern.length === userClickPattern.length){
            setTimeout(function(){
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("You Lose!!!");

        playSound("wrong");

        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        }, 200);

        $("h1").text("Game Over, Press Any Key to Restart")
        startOver();
    }
};




/* --------------------------------------------------------------------------------------- */


function nextSequence() {

    userClickPattern = [];

    level++;
    $("#level-title").text("Level " + level);

    let n = Math.floor((Math.random() * 3) + 1);
    let randomChosenColor = buttonColors[n];
    gamePattern.push(randomChosenColor);

    $("#"+ randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

};


/* --------------------------------------------------------------------------------------- */


function playSound(name) {

    let music = new Audio("./sounds/" + name + ".mp3");
    music.play();
};

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");

    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100)
};

/* ------------------------------------------------------------------------------------------ */


function startOver() {

    level = 0;
    gamePattern = [];
    started = false;
  }
  

