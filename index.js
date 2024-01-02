// var level = 0;
// var buttonColours = ["blue","green","red","yellow"];
// var colorSequence = [];
// var started = false;
// var index=0;


// document.addEventListener("keydown", function(){
//     console.log("heyyyyy");
//     if(!started){
//         level++;
//         $('#level-title').text('Level '+level);
//         createSequence();
//         started = true;
//     }
// })

// function createSequence(){
//     var randomNumber = Math.floor((Math.random()*4));
//     var randomChosenColour = buttonColours[randomNumber];
//     colorSequence.push(randomChosenColour);
//     animateButton(randomChosenColour);
//     playSound(randomChosenColour);
//     checkUserInput();
// }

// function checkUserInput(){
//     $(".btn").click(function(){
//         while(index <= (colorSequence.length)){
//             var clickedButton = $(this).attr('id');
//             animateButton(clickedButton);
//             playSound(clickedButton);
//             if(clickedButton === colorSequence[index]){
//                 index++;
//                 createSequence();
//             }
//             else{
//                 $('#level-title').text("Game Over. Press any key to Restart");
//                 started=false;
//                 level = 0;
//                 colorSequence=[];
//                 playSound(wrong);
//                 $("body").addClass(".game-over");
//                 setTimeout(function () {
//                     $("body").removeClass("game-over");
//                   }, 300);
//                   index=0;
//                   break;
//             }

//         }
        


//     })
// }

// function animateButton(randomChosenColour){
//      $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
// }

// function playSound(randomChosenColour){
//     var audio = new Audio("sounds/"+randomChosenColour+".mp3");
//     audio.play();
// }

var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {

  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startOver();
    }
}


function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
