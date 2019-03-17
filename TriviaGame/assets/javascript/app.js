// Targets
var $score = $('#score');
var $time_left = $('#time_left');
var $questions = $('#questions');
var $picks = $('#picks');
// Global Variables
var trivia = [
    {
        question: 'What is 3 + 3?', 
        answers: [33, 9, 8, 6],
        answer() {
            var correct_answer = $(this)[0].answers[1];
            return correct_answer;
        }
    }
    // {
    //     question: 'What is 1 + 1?', 
    //     answers: [3, 2, 11, 0],
    //     answer() {
    //         var correct_answer = $(this)[0].answers[1];
    //         return correct_answer;
    //     }
    // }
    // {
    //     question: 'What is 5 + 5?', 
    //     answers: [10, 55, 11, 7],
    //     answer() {
    //         var correct_answer = $(this)[0].answers[0];
    //         return correct_answer;
    //     }
    // }
];
console.log(trivia[0].answer());
var score = 0;
    $score.html('Score: ' + score);
var wrong = 0;
var time = 20;
var time_left;
var run = function() {
    clearInterval(time_left);
    time_left = setInterval(decrement, 1000);
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
                , 'correct':trivia[i].answer()
            }
            ).html(trivia[i].answers[j]);   
        // // add choice to choices
        $picks.append(choice);
        
    }
    // console.log($picks);
    // // click to grab user's answer
    $('.choices').on('click', function () {
        console.log($(this).attr('answer')); // this works!!!
        // check if selected answer is correct
        if ($(this).attr('answer') === $(this).attr('correct')) {
            console.log('this is correct!');
            // add one point to the score
            score++;
            // update/display score
            $score.html('Score: ' + score);
            // stop timer
            stop();
            // go to next question
            next_question();
        } else { // if selected answer is wrong
            console.log('This is wrong because you picked ' + $(this).attr('answer') +' when the correct answer is ' +$(this).attr('correct')+ '!');
            // add one point to wrong
            wrong++;
            console.log(wrong);
            // stop timer
            stop();
            // go to next question
            next_question();
        }
        return
    });
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

// change to next question
function next_question() {
    // clear question
    $questions.empty();
    // clear #picks
    $picks.empty();
    return

}
// start game
run();