

// $('#add_todo').css({
//     'border':'1px solid red'
// });
var todo_list = [];

//on click for #add_todo
$(document).on('click', '#add_todo', function () {
    var user_input = $('#user_input').val();
    // $('#todo_list').append('<li>').html(user_input);
    todo_list.push(user_input);
    console.log(todo_list);
});


var add_to_list = function() {
    for (var i = 0; i < todo_list.length; i++) {
        $('#todo_list').append('<li>' + todo_list[1] + '</li>');
        // console.log(todo_list[i]);
    }
};

