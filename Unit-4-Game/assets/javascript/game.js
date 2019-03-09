// Global Variables
var goal;
var lose = 0;
var win = 0;
var bag = 0;

// Targets
var $wins = $('#wins');
var $losses = $('#losses');
var $user_score = $('#user_score');
    // set
    $wins.html('Wins: ' +win);
    $losses.html('Losses: ' +lose);

// Functions
var reStart = function () {
    $('#crystals').empty();
    goal = Math.floor(Math.random() * 101) + 19; // 19 - 120
    $('#goal').html('Value Needed: ' + goal);
    for (var i = 0; i < 4; i++) {
        var random_value = Math.floor(Math.random() * 11) + 1;
        var crystal = $('<img/>');
        crystal.attr({
            'class': 'col-md-2 text-center crystal p-3',
            'data-crystal-value': random_value
        });

        $('#crystals').append(crystal); 
    }
}

reStart();

// Event Delegation
$(document).on('click', '.crystal', function () {
    var crystal_value = parseInt($(this).attr('data-crystal-value'));
    bag += crystal_value;
    $user_score.html(bag);

    if (bag > goal) {
        console.log('You lose!');
        lose++;
        $losses.html('Losses: ' +lose);
        bag = 0;
        reStart();
    }
    else if (bag === goal) {
        console.log('You win!');
        win++;
        $wins.html('Wins: ' +win);
        bag = 0;
        reStart();
        
    }
});





/*
====== Pseudocode ======
- The random number shown at the start of the game should be between 19 - 120. *
- 4 crystals *
- Each crystal should have a random hidden value between 1 - 12. *
- A new random number should be generated to all crystals every single time we win or lose
- When clicking any crystal, it should add it's value to the previous result until it equals the total score
- If it is not equal, then we start over
- If it is equal, then we increment a win counter.
*/