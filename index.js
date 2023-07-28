var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];
var count = 0;

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
        $("level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    userClickedPattern.push(userChosenColor)
    // console.log(userClickedPattern);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    if(userClickedPattern.length === gamePattern.length){
        checkAnswer();
    }
})

function nextSequence() {

    level++
    $("#level-title").text("Level " + level);

    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
}

function playSound(sound){
    var audio = new Audio("sounds/"+sound+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    },100);
}

function checkAnswer(){
    console.log(userClickedPattern);
    console.log(gamePattern);
    if (userClickedPattern[userClickedPattern.length-1] === gamePattern[gamePattern.length-1]){
        console.log("success");
        setTimeout(function(){
            nextSequence();
            userClickedPattern = [];
        },1000);
    }
    else{
        $("body").addClass("wrong");
        setTimeout(function(){
            $("body").removeClass("wrong");
        },300);
        $("#level-title").text("Game Over! Try Again");
        playSound("wrong");
    }
}