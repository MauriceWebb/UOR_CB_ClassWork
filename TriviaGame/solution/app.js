$(document).ready(function () {
var options = [
	{
		question: "In a 4 stroke engine which of these is the very first stroke?", 
		choice: ["Compression", "Intake", "Exhaust", "Power"],
		answer: 1,
		photo: "assets/images/intake.gif"
	 },
	 {
	 	question: "What does the alternator do in a car", 
		choice: ["Charge the battery", "Run the A/C pump", "Run the radiator fans", "Cool the engine"],
		answer: 0,
		photo: "assets/images/alternator.jpg"
	 }, 
	 {
	 	question: "Which of these cars is AWD (All Wheel Drive)", 
		choice: ["2002 Volkswagen Beetle GLS", "2008 Toyota Corolla LE", "2005 Subaru Impreza WRX STI", "2011 Nissan Sentra SR" ],
		answer: 2,
		photo: "assets/images/subie.gif"
	}, 
	{
		question: "What does the camshaft do in an engine?", 
		choice: ["Create the power to run the spark plugs", "Connect the pistons to the crankshaft", "Open the valves", "Absorb bumps in the road" ],
		answer: 2,
		photo: "assets/images/cam.gif"
	}, 
	{
		question: "ECM is short for?", 
		choice: ["Electric code map", "Electic control module", "Engine connection mode", "Engine control module" ],
		answer: 3,
		photo: "assets/images/ecm.jpg"
	}, 
	{
		question: "What is the main purpose of high octane fuel?", 
		choice: ["To burn bigger and hotter", "To reduce the risk of engine knock/pre-detonation on high compression/turbo cars", "To improve fuel economy on older cars", "To help the enviroment by producing less emissions" ],
		answer: 1,
		photo: "assets/images/lambo.gif"
	}, 
	{
		question: "What turbo is used on a 2007 Volvo S60R?", 
		choice: ["K04", "K24", "RHB31", "TD-04" ],
		answer: 1,
		photo: "assets/images/volvoturbo.jpg"
	}, 
	{
		question: "What does the connecting rod do in an engine?", 
		choice: ["Connect the piston to the crankshaft", "Connect the intake valve to the cylinder head", "Keep the crankshaft in place", "Connect the coil pack to the spark plug" ],
		answer: 0,
		photo: "assets/images/conrod.jpg"
	}];

var correctCount = 0;
var wrongCount = 0;
var unanswerCount = 0;
var timer = 20;
var intervalId;
var userGuess ="";
var running = false;
var qCount = options.length;
var pick;
var index;
var newArray = [];
var holder = [];



$("#reset").hide();
//click start button to start game
$("#start").on("click", function () {
		$("#start").hide();
		displayQuestion();
		runTimer();
		for(var i = 0; i < options.length; i++) {
	holder.push(options[i]);
}
	})
//timer start
function runTimer(){
	if (!running) {
	intervalId = setInterval(decrement, 1000); 
	running = true;
	}
}
//timer countdown
function decrement() {
	timer --;
	$("#timeleft").html("<h3>Time remaining: " + timer + "</h3>");

	//stop timer if reach 0
	if (timer === 0) {
		unanswerCount++;
		stop();
		$("#answerblock").html("<p>Time is up! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}	
}

//timer stop
function stop() {
	running = false;
	clearInterval(intervalId);
}
//randomly pick question in array if not already shown
//display question and loop though and display possible answers
function displayQuestion() {
	//generate random index in array
	index = Math.floor(Math.random()*options.length);
	pick = options[index];

//	if (pick.shown) {
//		//recursive to continue to generate new index until one is chosen that has not shown in this game yet
//		displayQuestion();
//	} else {
//		console.log(pick.question);
		//iterate through answer array and display
		$("#questionblock").html("<h2>" + pick.question + "</h2>");
		for(var i = 0; i < pick.choice.length; i++) {
			var userChoice = $("<div>");
			userChoice.addClass("answerchoice");
			userChoice.html(pick.choice[i]);
			//assign array position to it so it can check answer
			userChoice.attr("data-guessvalue", i);
			$("#answerblock").append(userChoice);
//		}
}



//click function to select answer and outcomes
$(".answerchoice").on("click", function () {
	//grab array position from userGuess
	userGuess = parseInt($(this).attr("data-guessvalue"));

	//correct guess or wrong guess outcomes
	if (userGuess === pick.answer) {
		stop();
		correctCount++;
		userGuess="";
		$("#answerblock").html("<p>Correct!</p>");
		hidepicture();

	} else {
		stop();
		wrongCount++;
		userGuess="";
		$("#answerblock").html("<p>Wrong! The correct answer is: " + pick.choice[pick.answer] + "</p>");
		hidepicture();
	}
})
}


function hidepicture () {
	$("#answerblock").append("<img src=" + pick.photo + ">");
	newArray.push(pick);
	options.splice(index,1);

	var hidpic = setTimeout(function() {
		$("#answerblock").empty();
		timer= 20;

	//run the score screen if all questions answered
	if ((wrongCount + correctCount + unanswerCount) === qCount) {
		$("#questionblock").empty();
		$("#questionblock").html("<h3>Game Over!  Here's how you did: </h3>");
		$("#answerblock").append("<h4> Correct: " + correctCount + "</h4>" );
		$("#answerblock").append("<h4> Incorrect: " + wrongCount + "</h4>" );
		$("#answerblock").append("<h4> Unanswered: " + unanswerCount + "</h4>" );
		$("#reset").show();
		correctCount = 0;
		wrongCount = 0;
		unanswerCount = 0;

	} else {
		runTimer();
		displayQuestion();

	}
	}, 3000);


}

$("#reset").on("click", function() {
	$("#reset").hide();
	$("#answerblock").empty();
	$("#questionblock").empty();
	for(var i = 0; i < holder.length; i++) {
		options.push(holder[i]);
	}
	runTimer();
	displayQuestion();

})

})