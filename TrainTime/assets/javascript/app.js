$(document).ready(function(){
    try {
        // Initialize Firebase
        var config = {
            apiKey: "AIzaSyDCZf8gynrLPgXluYCKJji0N71TrHHSR9k",
            authDomain: "classtest-6cb54.firebaseapp.com",
            databaseURL: "https://classtest-6cb54.firebaseio.com",
            projectId: "classtest-6cb54",
            storageBucket: "classtest-6cb54.appspot.com",
            messagingSenderId: "77999444853"
        };
        firebase.initializeApp(config);
    
        var database = firebase.database();
    } catch (err) {
        alert("Database connection failed.");
    }

    $('#submit').on('click', function (event) {
        event.preventDefault();
        var train_name = $('#trainName_input').val().trim(),
            destination = $('#destination_input').val().trim(),
            train_time = moment($('#trainTime_input').val().trim(), 'HH:mm').subtract(10, 'years').format('X'),
            frequency = $('#frequency_input').val().trim();

        var new_train = {
            name: train_name,
            dest: destination,
            time: train_time,
            freq: frequency
        };
        console.log(new_train);
        // send new_train data to database
        database.ref().push(new_train);

        alert('Train successfully added');

        // clear all inputs
        $('#trainName_input').val('');
        $('#destination_input').val('');
        $('#trainTime_input').val('');
        $('#frequency_input').val('');

        return false;
    });

    // retrieve data from database
    database.ref().on('child_added', function(snapshot, prevChildKey){
        var new_train_post = snapshot.val();
        let fb_train_name = new_train_post.name,
            fb_destination = new_train_post.dest,
            fb_train_time = new_train_post.time,
            fb_frequency = new_train_post.freq;
        // console.log(fb_train_name, fb_destination, fb_train_time, fb_frequency);

        let time_left = moment().diff(moment.unix(fb_train_time), 'minutes') % fb_frequency;
        let minutes = fb_frequency - time_left;
        let correct_train_time = moment.unix(fb_train_time).format('h:mm A');

        // console.log(time_left, minutes, correct_train_time);

        $('#train_data').append(`
         <tr class="text-center">
             <td>${fb_train_name}</td>
             <td>${fb_destination}</td>
             <td>${fb_frequency}</td>
             <td>${correct_train_time}</td>
             <td>${minutes}</td>
         </tr>
         `);
    });
});