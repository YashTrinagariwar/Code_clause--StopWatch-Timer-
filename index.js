

$(".stopwatch-btn").click(function(){
    $(".outer-wrapper > div").slideUp();

    $(".stopwatch").slideDown();
    $(".type").html("StopWatch");
});

$(".back-btn").click(function(){
    $(".outer-wrapper > div").slideUp();

    $(".clock").slideDown();
    $(".type").html("Clock");
});

$(".timer-btn").click(function(){
    $(".outer-wrapper > div").slideUp();
    $(".timer").slideDown();
    $(".type").html("Timer");
});






const addTrailingZero = (num)=>{
    return num<10 ? "0" + num : num;
};

// const zerov = ()=>{"
//     return "00";
// };"
const updateTime=()=>{
    const time = new Date();
    let hours  = time.getHours();
    let minutes = time.getMinutes();
    let seconds = time.getSeconds();
    let ampm = (hours >= 12) ? "PM" : "AM"
    let otherampm = (hours >= 12) ? "AM" : "PM";


    //converting 24 hours to 12
    hours = hours % 12 || 12;

    hours = addTrailingZero(hours);
    minutes = addTrailingZero(minutes);
    seconds = addTrailingZero(seconds);

    $("#hour").html(hours);
    $("#min").html(minutes);
    $("#sec").html(seconds);
    $("#ampm").html(ampm);
    $("#other-ampm").html(otherampm);
    
};


updateTime();

//call function after every second 
setInterval(updateTime,1000);



// StopWatch

let   stopWatchHours = 0;
let   stopWatchMinutes = 0;
let   stopWatchSeconds = 0;
let   stopWatchMiliseconds = 0;
let   stopWatchRunning = false;
let   laps = 0;
let   stopwatchInterval;

const stopwatch = () =>{

    stopWatchMiliseconds++;

    if(stopWatchMiliseconds == 100){
        stopWatchSeconds++;
        stopWatchMiliseconds = 0;
    }
    if(stopWatchSeconds == 60){
        stopWatchMinutes++;
        stopWatchSeconds = 0;
    }
    if(stopWatchMinutes == 60){
        stopWatchHours++;
        stopWatchMinutes = 0;
    }

    //display value
    $("#stopwatch-hour").html(addTrailingZero(stopWatchHours));
    $("#stopwatch-min").html(addTrailingZero(stopWatchMinutes));
    $("#stopwatch-sec").html(addTrailingZero(stopWatchSeconds));
    $("#stopwatch-ms").html(addTrailingZero(stopWatchMiliseconds));

};

//function to start stopwatch
const startstopwatch=()=>{
    if(!stopWatchRunning){
        stopwatchInterval = setInterval(stopwatch,10);
        stopWatchRunning = true;
    }
};

//function to stop stopwatch
const stopStopWatch = () => {
    clearInterval(stopStopWatch);
    stopWatchRunning = false;
};

const resetStopwatch = () => {
    clearInterval(stopwatchInterval);
    stopWatchSeconds = 0;
    stopWatchRunning = false;
    stopWatchHours = 0;  
    stopWatchMinutes = 0;
    stopWatchMiliseconds = 0;
    laps = 0;
    
    $("#stopwatch-ms").html("00");
    $("#stopwatch-hour").html("00");
    $("#stopwatch-min").html("00");
    $("#stopwatch-sec").html("00");
    $(".laps").html("");
};

$(".start-stopwatch").click(function () { 
    startstopwatch(); 
    $(".start-stopwatch").hide();
    $(".lap-stopwatch").show();
});

$(".reset-stopwatch").click(function () {
    
    resetStopwatch();
    $(".start-stopwatch").show();
    $(".lap-stopwatch").hide();
    // stopStopWatch();
    
});
// //on clicking laps
$(".lap-stopwatch").click(function () {
    
    laps++;
    $(".lap").removeClass("active");
    $(".laps").prepend(
        `<div class="lap active">
                    <p>lap ${laps}</p>
                    <p>
                        ${addTrailingZero(stopWatchHours)} : ${addTrailingZero(stopWatchMinutes)} : ${addTrailingZero(stopWatchSeconds)} : ${addTrailingZero(stopWatchMiliseconds)}
                        
                    </p>
                </div>`
        
    );
    
//     $(".laps").prepend(
//         <div class="lap active">
//             <p>lap ${laps}</p>
//             <p>
//                 ${addTrailingZero(stopWatchHours)} : ${addTrailingZero(stopWatchMinutes)} : ${addTrailingZero(stopWatchSeconds)} : ${addTrailingZero(stopWatchMiliseconds)}
                
//             </p>
//         </div>
//     );
});

//timer
let time = 0,
    timerHours = 0,
    timerMinutes = 0,
    timerSeconds = 0,
    timerMiliseconds = 0,
    timerInterval;

const getTime = ()=>{
    time = prompt("Enter time in minutes");
    // convert time into second
    time = time * 60;
    settime();
};
const settime = () => {
    timerHours = Math.floor(time / 3600);
    timerMinutes = Math.floor((time % 3600) / 60);
    timerSeconds = Math.floor(time % 60);


    // show user entered time on doc
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));
};

const timer = () => {
    timerMiliseconds--;
    if(timerMiliseconds == -1){
        timerMiliseconds = 99;
        timerSeconds--;
    }
    if(timerSeconds == -1){
        timerSeconds = 59;
        timerMinutes--;
    }
    if(timerMinutes == -1){
        timerMinutes = 59;
        timerHours--;
    }
    // update timer
    $("#timer-hour").html(addTrailingZero(timerHours));
    $("#timer-min").html(addTrailingZero(timerMinutes));
    $("#timer-sec").html(addTrailingZero(timerSeconds));
    $("#timer-ms").html(addTrailingZero(timerMiliseconds));

    //check time up on interval
    timeUp();

};

const startTimer = () => {

    if(timerHours == 0 && timerMinutes == 0 && timerSeconds == 0 && timerMiliseconds == 0){
        getTime();
    }
    else{
        //start timer
        $(".start-timer").hide();
        $(".stop-timer").show();
        timerInterval = setInterval(timer,10);
    }
};

// stop timer
const stopTimer =()=> {
    clearInterval(timerInterval);
    $(".start-timer").show();
    $(".stop-timer").hide();
};

const resetTime =()=>{
    stopTimer();
    time = 0;
    settime();
};

//check if time is remaining 0
const timeUp = () => {
    if(timerHours == 0 && timerMinutes == 0 && timerSeconds==0 && timerMiliseconds == 0){
        resetTime();
        alert("Time's up");

    }
}; 


$(".start-timer").click(function(){
    startTimer();
});
$(".stop-timer").click(function(){
    stopTimer();
});

$(".reset-timer").click(function(){
    resetTime();
})
