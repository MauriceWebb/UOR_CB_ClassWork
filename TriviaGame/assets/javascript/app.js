// Targets
var $score = $('#score');
var $time_left = $('#time_left');
var $questions = $('#questions');
var $picks = $('#picks');
// var correct_answer = '';
// Global Variables
var trivia = [
    {
        question: 'What is 1 + 1?', 
        answers: [3, 2, 11, 0],
        answer() {
            var correct_answer = $(this)[0].answers[1];
            // var correct_answer = $(this).answers[1];
            return correct_answer;
        }
        // correct: $(this).answer
    }
];
console.log(trivia[0].answer());
var score = 0;
    $score.html('Score: ' + score);
var time = 20;
var time_left;
var run = function() {
    clearInterval(time_left);
    time_left = setInterval(decrement, 1000);
}
// Count down time
function decrement() {
    time--;
    $time_left.html('Time Remaining: ' + time);
    // stop count down at zero
    if ( time === 0 ) {
        stop();
    }
}
// clear count down
function stop() {
    clearInterval(time_left);
}
// generate dynamic trivia
for (var i = 0; i < trivia.length; i++) {
    // display question
    $questions.html(trivia[i].question);
    // diplay choices
    // console.log('this works');
    for (var j = 0; j < trivia[i].answers.length; j++) {
        var choice = $('<p>').attr(
            {
                'class':'col-md-6 choices'
                , 'answer':trivia[i].answers[j]
                // , 'index':trivia[i].answers.indexOf(trivia[i].answers[j], 0)
            }
            ).html(trivia[i].answers[j]);    
        // add choice to choices
        $picks.append(choice);
        // $picks.attr('correct', trivia[i].correct);
    }
    console.log($picks);
    $('#picks').attr({'correct':trivia[i].correct});
    // // click to grab user's answer
    // $('.choices').on('click', function () {
    //     var user_choice = $(this).attr('answer');
    //     console.log($(this).attr('answer'));
    //     // console.log('Correct answer: ' + trivia[i].correct);
    //     console.log(trivia[i].answer());
    // });
}

// // click to grab user's answer
$('.choices').on('click', function () {
    var user_choice = $(this).attr('answer');
    console.log($(this).attr('answer'));
    console.log('Correct answer: ' + trivia[0].answer());
});
// start game
run();