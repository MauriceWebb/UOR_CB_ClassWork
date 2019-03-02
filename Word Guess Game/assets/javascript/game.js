// Word Guess Game


// Pseudocode:
var get_started = document.getElementById('get_started').textContent = 'Press any key to get started!',
    wins = document.getElementById('wins').textContent = 'Wins: ',
    // losses = document.getElementById('losses').textContent = 'Number of Guesses Remaining: ',
    letters_guessed = document.getElementById('letters_guessed'),
    // hint = document.getElementById('hint').textContent = 'Here\'s a hint: ',
    mystery_word = document.getElementById('mystery_word');
    // var wins_value = 0;

// 1.  create an array to hold words & their hints
var words = [
    {name: 'Epicuras', hint: 'Nothing is enough for the man to whom enough is too little.'}, 
    {name: 'Anaxagoras', hint: 'The seed of everything is in everything else.'}, 
    {name: 'Pythagoras', hint: 'There is geometry in the humming of the strings, there is music in the spacing of the spheres.”'}, 
    {name: 'Heraclitus', hint: 'There is nothing permanent except change.'}, 
    {name: 'Democritus', hint: 'Nothing exists except atoms and empty space; everything else is opinion.'}, 
    {name: 'Empedocles', hint: 'There are forces in nature called Love and Hate. The force of Love causes elements to be attracted to each other and to be built up into some particular form or person, and the force of Hate causes the decomposition of things.'}, 
    {name: 'Thales', hint: 'The most difficult thing in life is to know yourself.'}, 
    {name: 'Aristotle', hint: 'We are what we repeatedly do. Excellence, then, is not an act, but a habit.'}, 
    {name: 'Plato', hint: 'We can easily forgive a child who is afraid of the dark; the real tragedy of life is when men are afraid of the light.'}, 
    {name: 'Socrates', hint: 'Strong minds discuss ideas, average minds discuss events, weak minds discuss people.'} 
];
// 2.  generate a random number based on the length of words array
var random_number = Math.floor(Math.random() * words.length);
console.log(random_number);
// 3.  determine how many letters need to be guessed in order to guess correct word
var chosen_word = words[random_number].name,
    word_length = chosen_word.length;

// 4.  set how many guesses the user is allowed
var letters_to_guess = [word_length];
    

// 5.  display an underscore for each letter that needs to be gueesed to fill the word
var guesses_left = word_length + 5,
    losses = document.getElementById('losses').textContent = 'Number of Guesses Remaining: ' +guesses_left,
    output = '';
    // user_guess = '';

    function setup () {
        for ( var i = 0; i < chosen_word.length; i++) {
            letters_to_guess[i] = '_ ';
            output = output + letters_to_guess[i];
        }
        mystery_word.textContent += output;
        output = '';
        word_hint = words[random_number].hint;
        hint = document.getElementById('hint').textContent += word_hint;
        console.log(output);
        console.log(word_hint);
    };
    

// 6.  store the word's characters as an array of letters
word_letters = chosen_word.split('');
    console.log(word_letters);


window.onload = function () {
        setup();
}
// 7.  get a letter from the user
document.onkeyup = function (event) {

    var user_guess = event.key.toLowerCase();

    if (letters_guessed.indexOf(user_guess) === -1 ) {
        letters_guessed.textContent += (user_guess);
    }
    
};



// 8.  compare it to each letter in the word's array

//     if user's letter guess matches a letter in the word
//         replace the underscore with the letter in it's correct place
//         subtract 1 from the number of letters that need to be guessed to win

// ========= MAIN ================
window.onload = function () {
    setup();
}



// onkeyup function captures the users keyboard input
document.onkeyup = function(event) {
    // audioFile.pause();
    userChoice = (String.fromCharCode(event.keyCode)).toLowerCase();
    if(lettersGuessed.indexOf(userChoice) === -1) {
       lettersGuessed.push(userChoice);
        lettersUsed.innerHTML = "<strong>"+lettersGuessed+"<strong>";
        checkUserInput(userChoice);
        if(remainingGuess > 0 && selectedWord.join("") !== wordChoice && lettersGuessed.length !== 0) {
            remainingGuess--;
        }
        countGuess.innerHTML = "<strong>"+remainingGuess+"</strong>";
        if(remainingGuess === 0 && selectedWord.join("") !== wordChoice) {
            gameMessage.innerHTML = "<strong>Out of guesses!</strong>";
            audioFile.src = "assets/audio/lose-sound.mp3";
            audioFile.type = "audio/mpeg"
            audioFile.play();
            pickAWord();
        }
    }else {
        displayMessage.innerHTML = "<strong>Letter already used, type something else!</strong>";    
    }    
}