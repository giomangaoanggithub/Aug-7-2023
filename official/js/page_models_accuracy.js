var str_questions = "";
var str_answers = "";
var str_truths = "";
var str_outcome = "";
var arr_questions = [];
var build_increment = 0;
var get_model_increment = 0;
var answering_question_num = 0;
var inside_answer_set = 0;
var arr_arr_answers = [];
var true_p = 0;
var true_n = 0;
var false_p = 0;
var false_n = 0;
var hit = 0;
var miss = 0;

function initial_files() {
  $.get(
    current_hosting_url + "php/demo/php/mass_demo_files.php",
    function (data) {
      document.getElementById("user-files-content").innerText = data;
    }
  );
}
initial_files();

function initial_diverse_colors() {
  document.getElementsByClassName("diverse-context")[0].style.background =
    "rgb(128,0,0)";
  document.getElementsByClassName("diverse-context")[1].style.background =
    "rgb(255,128,0)";
  document.getElementsByClassName("diverse-context")[2].style.background =
    "rgb(0,128,0)";
  document.getElementsByClassName("diverse-context")[3].style.background =
    "rgb(128,255,0)";
  document.getElementsByClassName("diverse-context")[4].style.background =
    "rgb(0,255,128)";
  document.getElementsByClassName("diverse-context")[5].style.background =
    "rgb(0,128,255)";
  document.getElementsByClassName("diverse-context")[6].style.background =
    "rgb(128,0,255)";
  document.getElementsByClassName("diverse-context")[0].style.color = "white";
  document.getElementsByClassName("diverse-context")[2].style.color = "white";
  document.getElementsByClassName("diverse-context")[6].style.color = "white";
  document.getElementsByClassName("diverse-context")[0].innerHTML =
    "physics dealing transmission light images glass plastic optics";
  document.getElementsByClassName("diverse-context")[1].innerHTML =
    "archimedes principle law stating object";
  document.getElementsByClassName("diverse-context")[2].innerHTML =
    "passing poles celestial sphere imaginary plane pass";
  document.getElementsByClassName("diverse-context")[3].innerHTML =
    "completer cycle watts unit power rate energy";
  document.getElementsByClassName("diverse-context")[4].innerHTML =
    "stretch compress sample deforms stains proportion returns original";
  document.getElementsByClassName("diverse-context")[5].innerHTML =
    "shaft engine maintains smooth rotation shaft high inertia forensic science";
  document.getElementsByClassName("diverse-context")[6].innerHTML =
    "satellite kind spacecraft satellite dish kind aerial seismograph instrument";
  //   initial_diverse_contexts();
}
initial_diverse_colors();

function initial_diverse_contexts() {
  $.get(
    current_hosting_url + "php/demo/php/all_diverse_contexts.php",
    function (data) {
      //   alert(data);
      time = "";
      num_phrases = "";
      phrases = "";
      x = 0;
      while (x < data.indexOf("<&time&>")) {
        time += data[x];
        x++;
      }
      x += "<&time&>".length;
      while (x < data.indexOf("<&num_phrases&>")) {
        num_phrases += data[x];
        x++;
      }
      x += "<&num_phrases&>".length;
      while (x < data.indexOf("<&phrases&>")) {
        phrases += data[x];
        x++;
      }
      phrases = phrases.split("<,>");
      for (
        i = 0;
        i < document.getElementsByClassName("diverse-context").length;
        i++
      ) {
        document.getElementsByClassName("diverse-context")[i].innerHTML =
          phrases[i];
      }
    }
  );
}

function load_qa_truths() {
  $.get(current_hosting_url + "php/demo/php/DATA.php", function (data) {
    x = 0;
    while (x < data.indexOf("<&questions&>")) {
      str_questions += data[x];
      x++;
    }
    x += "<&questions&>".length;
    while (x < data.indexOf("<&anwers&>")) {
      str_answers += data[x];
      x++;
    }
    x += "<&anwers&>".length;
    while (x < data.indexOf("<&truths&>")) {
      str_truths += data[x];
      x++;
    }
    // alert(str_questions);
    // alert(str_answers);
    // alert(str_truths);
    display_questions();
  });
}
load_qa_truths();

function display_questions() {
  arr_questions = str_questions.split("<,>");
  str_html = ``;
  x = 0;
  for (i = 0; i < arr_questions.length; i++) {
    str_html +=
      `<div><div class="question-placement" onclick="display_curr_question_content(` +
      i +
      `)"><strong>` +
      arr_questions[i] +
      `</strong></div><div class="data-tab-selection row"><div class="question-answers col-6"><button id="question-answers-` +
      x +
      `" onmouseover="cursor_btn_behavior(this.id)" onclick="cursor_tab_btn_onclick(this.id)">Answers</button></div><div class="question-model col-6"><button id="question-model-` +
      x +
      `" onmouseover="cursor_btn_behavior(this.id)" onclick="cursor_tab_btn_onclick(this.id)" style="background-color: sienna; color: white;">Model</button></div></div><div class="answers-set"></div><div class="model-set">MODEL HERE</div></div>`;
    x++;
  }
  document.getElementById("list-of-questions").innerHTML = str_html;
  display_answers();
}

function display_answers() {
  arr_answers = str_answers.split("<,>");
  arr_truths = str_truths.split("<,>");
  for (i = 0; i < arr_answers.length; i++) {
    answers_set = arr_answers[i].split("<,,>");
    arr_arr_answers.push(answers_set);
    truths_set = arr_truths[i].split("<,,>");
    str_html = `<table class="table-answers">`;
    for (h = 0; h < answers_set.length; h++) {
      truth_color = "";
      if (truths_set[h] == "TN") {
        truth_color = `color: rgb(255, 128, 0); background-color: black;`;
      }
      str_html +=
        `<tr><td style="width: 10%; ` +
        truth_color +
        `">` +
        `Answer ` +
        (h + 1) +
        `: ` +
        `</td><td style="width: 80%; ` +
        truth_color +
        ` text-align: justify;">` +
        answers_set[h] +
        `</td><td id="grade_question_` +
        i +
        `_answer_` +
        h +
        `" style="width: 10%;">` +
        `<span class="material-icons">pending</span>` +
        `</td></tr>`;
    }
    str_html += `</table>`;
    document.getElementsByClassName("answers-set")[i].innerHTML = str_html;
  }
  // build_models();
  get_models();
}

function display_curr_question_content(input) {
  if (
    document.getElementsByClassName("table-answers")[input].style.display ==
    "block"
  ) {
    document.getElementsByClassName("data-tab-selection")[
      input
    ].style.visibility = "hidden";
    document.getElementsByClassName("table-answers")[input].style.display =
      "none";
    document.getElementsByClassName("model-set")[input].style.display = "none";
  } else {
    document.getElementsByClassName("data-tab-selection")[
      input
    ].style.visibility = "visible";
    document.getElementsByClassName("table-answers")[input].style.display =
      "block";
    document.getElementsByClassName("model-set")[input].style.display = "block";
  }
}

function confusion_matrix_properties() {
  document.getElementsByClassName("confusion-tile")[0].style.borderTop = "none";
  document.getElementsByClassName("confusion-tile")[0].style.borderLeft =
    "none";
  document.getElementsByClassName("confusion-tile")[0].style.background =
    "yellowgreen";

  document.getElementsByClassName("confusion-tile")[1].style.borderTop = "none";
  document.getElementsByClassName("confusion-tile")[1].style.borderRight =
    "none";
  document.getElementsByClassName("confusion-tile")[1].style.background = "red";
  document.getElementsByClassName("confusion-tile")[2].style.borderBottom =
    "none";
  document.getElementsByClassName("confusion-tile")[2].style.borderLeft =
    "none";
  document.getElementsByClassName("confusion-tile")[2].style.background =
    "green";
  document.getElementsByClassName("confusion-tile")[3].style.borderBottom =
    "none";
  document.getElementsByClassName("confusion-tile")[3].style.borderRight =
    "none";
  document.getElementsByClassName("confusion-tile")[3].style.background =
    "yellow";
}
confusion_matrix_properties();

function cursor_btn_behavior(input) {
  if (document.getElementById(input).style.backgroundColor != "sienna") {
    document.getElementById(input).style.cursor = "default";
  } else {
    document.getElementById(input).style.cursor = "pointer";
  }
}

function cursor_tab_btn_onclick(input) {
  cleansed_input = "";
  for (i = input.length - 1; input[i] != "-"; i--) {
    cleansed_input = input[i] + cleansed_input;
  }
  if (input.includes("question-model")) {
    document.getElementById(
      "question-answers-" + cleansed_input
    ).style.backgroundColor = "sienna";
    document.getElementById("question-answers-" + cleansed_input).style.color =
      "white";
    document.getElementById(
      "question-model-" + cleansed_input
    ).style.backgroundColor = "transparent";
    document.getElementById("question-model-" + cleansed_input).style.color =
      "black";
    document.getElementsByClassName("answers-set")[
      cleansed_input
    ].style.display = "none";
    document.getElementsByClassName("model-set")[cleansed_input].style.display =
      "block";
  } else {
    document.getElementById(
      "question-model-" + cleansed_input
    ).style.backgroundColor = "sienna";
    document.getElementById("question-model-" + cleansed_input).style.color =
      "white";
    document.getElementById(
      "question-answers-" + cleansed_input
    ).style.backgroundColor = "transparent";
    document.getElementById("question-answers-" + cleansed_input).style.color =
      "black";
    document.getElementsByClassName("answers-set")[
      cleansed_input
    ].style.display = "block";
    document.getElementsByClassName("model-set")[cleansed_input].style.display =
      "none";
  }
}

function build_models() {
  $.post(
    current_hosting_url + "php/mass_models.php",
    { demo_question: arr_questions[build_increment] },
    function (data) {
      if (data == "complete") {
        console.log("SUCCESS: " + arr_questions[build_increment]);
        build_increment++;
        if (build_increment < arr_questions.length) {
          build_models();
        } else if (build_increment == arr_questions.length) {
          alert("Build Model Complete!");
        }
      } else if (data.includes("<")) {
        console.log(
          "FAILED: " + arr_questions[build_increment] + " | NO REFERENCE"
        );
        build_increment++;
        if (build_increment < arr_questions.length) {
          build_models();
        } else if (build_increment == arr_questions.length) {
          alert("Build Model Complete!");
        }
      } else {
        alert("Something Went Wrong");
        alert(data);
      }
    }
  );
}

function get_models() {
  if (get_model_increment < arr_questions.length) {
    $.post(
      current_hosting_url + "php/demo_show_models.php",
      { find_question: arr_questions[get_model_increment] },
      function (data) {
        raw_contexts = "";
        raw_tfidf = "";
        raw_time = "";
        raw_indexes = "";
        raw_numphrases = "";
        x = "<&contexts&>".length;
        while (x < data.indexOf("<&tfidf&>")) {
          raw_contexts += data[x];
          x++;
        }
        x = "<&tfidf&>".length + data.indexOf("<&tfidf&>");
        while (x < data.indexOf("<&time&>")) {
          raw_tfidf += data[x];
          x++;
        }
        x = "<&time&>".length + data.indexOf("<&time&>");
        while (x < data.indexOf("<&indexes&>")) {
          raw_time += data[x];
          x++;
        }
        x = "<&indexes&>".length + data.indexOf("<&indexes&>");
        while (x < data.indexOf("<&numphrases&>")) {
          raw_indexes += data[x];
          x++;
        }
        x = "<&numphrases&>".length + data.indexOf("<&numphrases&>");
        while (x < data.length) {
          raw_indexes += data[x];
          x++;
        }
        // console.log(raw_tfidf);
        // console.log(arr_arr_answers[answering_question_num]);
        answering_question(
          arr_arr_answers[answering_question_num],
          "<&contexts&>" +
            raw_contexts +
            "<&tfidf&>" +
            raw_tfidf +
            "<&time&>" +
            raw_time
        );
      }
    );
  } else {
    translate_models();
  }
}

function translate_models() {
  console.log("translate_models()");
  // console.log(str_truths);
  hold_str = "";
  for (i = 0; i < str_outcome.length - 3; i++) {
    hold_str += str_outcome[i];
  }
  str_outcome = hold_str;
  // console.log(str_outcome);
  arr_truths = str_truths.split("<,>");
  arr_outcomes = str_outcome.split(",|,");
  for (i = 0; i < arr_truths.length; i++) {
    if (arr_outcomes[i].includes("NN") != true) {
      truths_set = arr_truths[i].split("<,,>");
      outcomes_set = arr_outcomes[i].split(",");
      for (h = 0; h < truths_set.length; h++) {
        if (truths_set[h] == outcomes_set[h]) {
          hit++;
          if (truths_set[h] == "TP") {
            true_p++;
          } else {
            true_n++;
          }
        } else {
          miss++;
          if (truths_set[h] == "TP" && outcomes_set[h] == "TN") {
            false_n++;
          } else {
            false_p++;
          }
        }
      }
    }
  }
  document.getElementsByClassName("confusion-tile")[0].innerHTML = true_p;
  document.getElementsByClassName("confusion-tile")[1].innerHTML = false_p;
  document.getElementsByClassName("confusion-tile")[2].innerHTML = true_n;
  document.getElementsByClassName("confusion-tile")[3].innerHTML = false_n;
  document.getElementById("success-rate-outcome").innerText =
    Math.floor((hit / (hit + miss)) * 100, 2) + "%";
}

function answering_question(text, parameter_input) {
  $.post(
    current_hosting_url + "php/demo_nlpcheck.php",
    {
      text: text[inside_answer_set],
      grammar: 0,
      parameter: parameter_input, //arr_context_user1_user2[answering_question_num],
    },
    function (data) {
      // console.log(data);

      if (
        inside_answer_set < arr_arr_answers[answering_question_num].length &&
        answering_question_num < arr_arr_answers.length
      ) {
        if (data.includes("<b>Fatal error</b>:") != true) {
          // console.log(
          //   "question_" +
          //     answering_question_num +
          //     " | length: " +
          //     arr_arr_answers[answering_question_num].length +
          //     " | answering: " +
          //     (inside_answer_set + 1)
          // );
          // console.log(data);
          data = data.split("<&,&>");
          if (data[2] == 1) {
            document.getElementById(
              "grade_question_" +
                answering_question_num +
                "_answer_" +
                inside_answer_set
            ).innerHTML = "<span>" + data[0] + "%</span>";
            str_outcome += "TP,";
          } else {
            document.getElementById(
              "grade_question_" +
                answering_question_num +
                "_answer_" +
                inside_answer_set
            ).innerHTML = "<span>0%</span>";
            str_outcome += "TN,";
          }
        } else {
          document.getElementById(
            "grade_question_" +
              answering_question_num +
              "_answer_" +
              inside_answer_set
          ).innerHTML = "<span>?</span>";
          str_outcome += "NN,";
        }

        inside_answer_set++;
        answering_question(text, parameter_input);
      } else {
        str_outcome += "|,";
        inside_answer_set = 0;
        answering_question_num++;
        get_model_increment++;
        get_models();
      }
    }
  );
}
