var minutes;
var tensSec = 0;
var onesSec = 0;
var timer;
var timerOn = false;
var audio = new Audio ("http://onlineclock.net/audio/options/bird-song.mp3");

//displays work timer in #elapsedTime area
function work(){
  $("#timeTitle").html("Work");
  minutes = $("#workTime").html();
  $("#elapsedTime").html(parseInt(minutes) + ":" + tensSec + onesSec); 
}
//displays rest timer in #elapsedTime area
function rest(){
  $("#timeTitle").html("Break");
  minutes = $("#breakTime").html();
  $("#elapsedTime").html(parseInt(minutes) + ":" + tensSec + onesSec);
}
//counts down seconds in the ones column 
function onesSeconds(){
  onesSec === 0 ? onesSec = 9 : onesSec -= 1 ;
}
//counts down seconds in the tens column
function tensSeconds(){
  if(onesSec === 9 && tensSec === 0){
  	tensSec = 5;
  }else if(onesSec === 9 && tensSec > 0){
  	tensSec -= 1;
  }
}
//counts down minutes
function min(){
  onesSec === 0 && tensSec === 0 ? minutes = parseInt(minutes) - 1 : minutes = parseInt(minutes);
}
//displays current time based on where the timer is in its countdown
function changeTime(){
  min();
  onesSeconds();
  tensSeconds();  
  $("#elapsedTime").html(minutes + ":" + tensSec + onesSec);
}
// start timer
function startTimer(){
  timerOn = true;
  countdown(); 
}
// stop timer
function stopTimer(){
  timerOn = false;
  $(".clock").css("background-color", "white");
  clearTimeout(timer); 
}
// switch from work to break and back again when timer hits 0:00
function switchSession(){
  if(minutes === 0 && tensSec === 0 && onesSec === 0){
    $("#timeTitle").html() === "Work" ? rest() : work();
    audio.play();
  }
}
// switch color of timer to green for work and red for break
function switchColor(){
  $("#timeTitle").html() === "Work" ? $(".clock").css("background-color", "#C8FFBE") : $(".clock").css("background-color", "#FE938C");
}
//setTimeout function
function countdown(){
  timer = setTimeout(function(){
    switchSession();
    switchColor();
    changeTime();
  	countdown();
  }, 1000);	
}
// reset time on timer
function reset(){
  $("#workTime").html("25");
  $("#breakTime").html("5");
  onesSec = 0;
  tensSec = 0;
}

$(document).ready(function(){
  work();
  $(".clock").click(function(){
    if(!timerOn){
      startTimer();
 	 }else{
  	  stopTimer();
    }
  });
  // adjusts work time based on plus or minus button clicks
  $("#workPlus, #workMinus").click(function(){
    var newMinute = $("#workTime").html();
    if($(this).attr("id") === "workMinus" && newMinute > 1){
      newMinute = parseInt(newMinute) - 1;
      $("#workTime").html(newMinute);  
    }else if($(this).attr("id") === "workPlus" && newMinute > 0){
      newMinute = parseInt(newMinute) + 1;
      $("#workTime").html(newMinute);
    }
    work();
  });
  // adjusts rest time based on plus or minus button clicks
  $("#breakPlus, #breakMinus").click(function(){
    var newMinute = $("#breakTime").html();
    if($(this).attr("id") === "breakMinus" && newMinute > 1){
      newMinute = parseInt(newMinute) - 1;
      $("#breakTime").html(newMinute);
    }else if($(this).attr("id") === "breakPlus" && newMinute > 0){
      newMinute = parseInt(newMinute) + 1;
      $("#breakTime").html(newMinute);
    } 
  }); 
  // resets timer to original state 
  $("#reset").click(function(){
    stopTimer();
    reset();
    work();
  }); 
});
