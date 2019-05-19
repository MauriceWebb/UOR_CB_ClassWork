// load in questions...
const survey_questions = [
  `My partner must share the same religious beliefs of me.`,
  `My religion is more important to me than family.`,
  `I'm ready for marraige.`,
  `I believe in gender roles.`,
  `I should love myself more than my partner.`,
  `Men are superior than woman.`,
  `God is a male.`,
  `Homogeny is just as laudable as heterogeny.`,
  `My partner and I should resolve conflicts before bed.`,
  `I should be whole before the relationship, not by the relationship.`
];
const survey_objects = survey_questions.forEach((question, i) => {
  const options = () => {
    let html = "";
    for (let j = 1; j <= 5; j++) {
      if (j === 1) {
        html += `<option value="${j}">${j} (Strongly Disgree)</option>`;
      } else if (j === 5) {
        html += `<option value="${j}">${j} (Strongly Agree)</option>`;
      } else {
        html += `<option value="${j}">${j}</option>`;
      }
    }
    return html;
  };
  $("#survey").append(`
      <h3><strong>Question ${i + 1}</strong></h3>
      <h4>${question}</h4>
      <div class="input-group mb-3">
      <select class="custom-select" id="q${i + 1}">
          <option selected>Choose...</option>
          ${options()}
      </select>
  </div>

      `);
});

// Capture the form inputs
$('#submit').on("click", function(event) {
  event.preventDefault();

  // Form validation
  function validateForm() {
    var isValid = true;
    $(".form-control").each(function() {
      if ($(this).val() === "") {
        isValid = false;
      }
    });

    $(".custom-select").each(function() {
      if ($(this).val() === "") {
        isValid = false;
      }
    });
    return isValid;
  }

  // If all required fields are filled
  if (validateForm()) {
    // Create an object for the user"s data
    var userData = {
      name: $("#name").val(),
      photo: $("#photo").val(),
      scores: [
        $("#q1").val(),
        $("#q2").val(),
        $("#q3").val(),
        $("#q4").val(),
        $("#q5").val(),
        $("#q6").val(),
        $("#q7").val(),
        $("#q8").val(),
        $("#q9").val(),
        $("#q10").val()
      ]
    };

    // AJAX post the data to the friends API.
    $.post("/api/friends", userData, function(data) {
      // Grab the result from the AJAX post so that the best match's name and photo are displayed.
      $("#match-name").text(data.name);
      $("#match-img").attr("src", data.photo);

      // Show the modal with the best match
      $("#results-modal").modal("toggle");
      
    }).then((userData) => {
      if (userData) {
          alert('Welcome aboard the Love Cruise!');
      }
      else {
          alert(`We can't sail under those inclemment conditions...`);
      }
    });
  } else {
    alert("Please fill out all fields before submitting!");
  }
});