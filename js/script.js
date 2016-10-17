var minutes;
var tensSec = 0;
var onesSec = 0;
var timer;
var timerOn = false;

//displays work timer in #elapsedTime area
function work(){
  $("#timeTitle").html("Work");
  minutes = $("#workTime").html().match(/\d+/).toString();
  $("#elapsedTime").html(parseInt(minutes) + ":" + tensSec + onesSec); 
}
//displays rest timer in #elapsedTime area
function rest(){
  $("#timeTitle").html("Break");
  minutes = $("#breakTime").html().match(/\d+/).toString();
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
//setTimeout function
function countdown(){
  timer = setTimeout(function(){
  	if(minutes === 0 && tensSec === 0 && onesSec === 0){
  		rest();
  		changeTime();
  		countdown();
  	}else{
  	  changeTime();
      countdown();	
  	}  
  }, 1000);	
}

$(document).ready(function(){
  work();
  $(".clock").click(function(){
 	  if(!timerOn){
  	  timerOn = true;
      countdown();
 	  }else{
  	  timerOn = false;
   	  clearTimeout(timer);
    }
  });
  // adjusts work time based on plus or minus button clicks
  $("#workPlus, #workMinus").click(function(){
    var newMinute = $("#workTime").html().match(/\d+/).toString();
    $(this).attr("id") === "workPlus" ? newMinute = parseInt(newMinute) + 1 : newMinute = parseInt(newMinute) - 1;
    $("#workTime").html(newMinute + " minutes"); 
    work();
  });
  // adjusts rest time based on plus or minus button clicks
  $("#breakPlus, #breakMinus").click(function(){
    var newMinute = $("#breakTime").html().match(/\d+/).toString();
    $(this).attr("id") === "breakPlus" ? newMinute = parseInt(newMinute) + 1 : newMinute = parseInt(newMinute) - 1;
    $("#breakTime").html(newMinute + " minutes");
  });   
});
