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
var curr_chosen_model = 1;
var count_questions = 0;
var curr_question_making = 0;
var supported_questions = 0;
var total_num_questions = 0;

function initial_files() {
  console.log("initial_files()");
  $.get(
    current_hosting_url + "php/demo/php/mass_demo_files.php",
    function (data) {
      data = data.split("<,>");
      outcome = data[0];
      for (i = 1; i < data.length; i++) {
        outcome += ", " + data[i];
      }
      document.getElementById("user-files-content").innerText = outcome;
    }
  );
}
initial_files();

function initial_diverse_colors() {
  document.getElementById("overlay").style.display = "block";
  console.log(
    "initial_diverse_colors() and curr_chosen_model: " + curr_chosen_model
  );
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
  if (curr_chosen_model == 1) {
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
  }

  // initial_diverse_contexts();
}
initial_diverse_colors();

function loading_new_diverse_colors(input) {
  console.log("loading_new_diverse_colors(" + input + ")");
  if (input == 1) {
    document.getElementById("question-use-reference").innerText =
      "Questions: REFERENCE 1";
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
    load_models(1);
  } else if (input == 2) {
    document.getElementById("question-use-reference").innerText =
      "Questions: REFERENCE 2";
    document.getElementsByClassName("diverse-context")[0].innerHTML =
      "nuclear reactions selfsustaining series circular motions motion";
    document.getElementsByClassName("diverse-context")[1].innerHTML =
      "called impulse forces incandescent matter emitted";
    document.getElementsByClassName("diverse-context")[2].innerHTML =
      "repels positions charged attracted negatively charged positions ions atom";
    document.getElementsByClassName("diverse-context")[3].innerHTML =
      "work scalar quantity unit work joules";
    document.getElementsByClassName("diverse-context")[4].innerHTML =
      "electron volt energy gained electron moving potential differences volt equivalent 1 60";
    document.getElementsByClassName("diverse-context")[5].innerHTML =
      "melting point temperature phase change solid liquid takes place temperature freezing point";
    document.getElementsByClassName("diverse-context")[6].innerHTML =
      "traveled faster speed sound specific heat substance specific heat defined energi";
    load_models(2);
  } else {
    document.getElementById("question-use-reference").innerText =
      "Questions: REFERENCE 3";
    document.getElementsByClassName("diverse-context")[0].innerHTML = "period";
    document.getElementsByClassName("diverse-context")[1].innerHTML =
      "waves vibrates parallel direction propagation physics definitions";
    document.getElementsByClassName("diverse-context")[2].innerHTML =
      "coil selfinductions";
    document.getElementsByClassName("diverse-context")[3].innerHTML =
      "particles noninteger charge combine integer charge form";
    document.getElementsByClassName("diverse-context")[4].innerHTML =
      "negative inverted refracted bending";
    document.getElementsByClassName("diverse-context")[5].innerHTML =
      "parallel circuit split";
    document.getElementsByClassName("diverse-context")[6].innerHTML =
      "frequency photoemissions place work functions";
    load_models(3);
  }
}

function initial_diverse_contexts() {
  console.log("initial_diverse_contexts()");
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
      console.log("initial_diverse_contexts(): reading time");
      x += "<&time&>".length;
      while (x < data.indexOf("<&num_phrases&>")) {
        num_phrases += data[x];
        x++;
      }
      console.log("initial_diverse_contexts(): reading number of phrases");
      x += "<&num_phrases&>".length;
      while (x < data.indexOf("<&phrases&>")) {
        phrases += data[x];
        x++;
      }
      console.log("initial_diverse_contexts(): reading phrases");
      phrases = phrases.split("<,>");
      for (
        i = 0;
        i < document.getElementsByClassName("diverse-context").length;
        i++
      ) {
        document.getElementsByClassName("diverse-context")[i].innerHTML =
          phrases[i];
        console.log("initial_diverse_contexts(): displaying phrases" + i);
      }
    }
  );
}

function load_qa_truths() {
  console.log("load_qa_truths()");
  $.get(current_hosting_url + "php/demo/php/DATA2.php", function (data) {
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
  console.log("display_questions()");
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
    count_questions++;
  }
  document.getElementById("list-of-questions").innerHTML = str_html;
  display_answers();
}

function display_answers() {
  console.log("display_answers()");
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
  console.log("display_curr_question_content()");
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
  console.log("confusion_matrix_properties");
  document.getElementsByClassName("confusion-tile")[0].style.borderTop = "none";
  document.getElementsByClassName("confusion-tile")[0].style.borderLeft =
    "none";
  document.getElementsByClassName("confusion-tile")[0].style.background =
    "yellowgreen";

  document.getElementsByClassName("confusion-tile")[1].style.borderTop = "none";
  document.getElementsByClassName("confusion-tile")[1].style.borderRight =
    "none";
  document.getElementsByClassName("confusion-tile")[1].style.background = "red";
  document.getElementsByClassName("confusion-tile")[1].style.color = "white";
  document.getElementsByClassName("confusion-tile")[2].style.borderBottom =
    "none";
  document.getElementsByClassName("confusion-tile")[2].style.borderLeft =
    "none";
  document.getElementsByClassName("confusion-tile")[2].style.background =
    "green";
  document.getElementsByClassName("confusion-tile")[2].style.color = "white";
  document.getElementsByClassName("confusion-tile")[3].style.borderBottom =
    "none";
  document.getElementsByClassName("confusion-tile")[3].style.borderRight =
    "none";
  document.getElementsByClassName("confusion-tile")[3].style.background =
    "yellow";
}
confusion_matrix_properties();

function cursor_btn_behavior(input) {
  console.log("cursor_btn_behavior()");
  if (document.getElementById(input).style.backgroundColor != "sienna") {
    document.getElementById(input).style.cursor = "default";
  } else {
    document.getElementById(input).style.cursor = "pointer";
  }
}

function cursor_tab_btn_onclick(input) {
  console.log("cursor_tab_btn_onclick");
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
  console.log("build_models()");
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
  console.log("get_models()");
  if (get_model_increment < arr_questions.length) {
    $.post(
      current_hosting_url + "php/demo_show_models.php",
      {
        find_question: arr_questions[get_model_increment],
        find_set_model: curr_chosen_model,
      },
      function (data) {
        console.log("data: " + data);
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
          raw_numphrases += data[x];
          x++;
        }
        document.getElementById("number-of-contexts").innerHTML =
          "#Contexts: " + raw_numphrases;
        indexes_set = raw_indexes.split("<,>");
        arr_colors = [];
        color_results =
          `<div style="background-color: ` +
          color_translation(indexes_set[0] / raw_numphrases) +
          `;"></div>`;
        arr_colors.push(color_translation(indexes_set[0] / raw_numphrases));
        for (i = 1; i < indexes_set.length; i++) {
          color_results +=
            `<div style="background-color: ` +
            color_translation(indexes_set[i] / raw_numphrases) +
            `;"></div>`;
          arr_colors.push(color_translation(indexes_set[i] / raw_numphrases));
        }
        spanning_contexts = raw_contexts.split("<,>");

        contexts_results =
          `<div class="model-2-content row"><div class="col-lg-2"><span style="color: ` +
          arr_colors[0] +
          `;">context[` +
          indexes_set[0] +
          `]: </span></div><div class="col-lg-10"><span style="color: ` +
          arr_colors[0] +
          `;">` +
          spanning_contexts[0] +
          `</span></div></div>`;
        for (i = 1; i < spanning_contexts.length; i++) {
          contexts_results +=
            `<div class="model-2-content row"><div class="col-lg-2"><span style="color: ` +
            arr_colors[i] +
            `;">context[` +
            indexes_set[i] +
            `]: </span></div><div class="col-lg-10"><span style="color: ` +
            arr_colors[i] +
            `;">` +
            spanning_contexts[i] +
            `</span></div></div>`;
        }
        console.log(contexts_results);
        document.getElementsByClassName("model-set")[
          answering_question_num
        ].innerHTML =
          `<div class="model-1">` +
          color_results +
          `</div><br><strong>Contexts: </strong><br><div id="word-cloud-` +
          answering_question_num +
          `" class="model-3"></div><br><div class="model-2">` +
          contexts_results +
          `</div>`;
        // console.log(color_results);
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
        context_cloud(spanning_contexts, arr_colors, answering_question_num);
        curr_question_making++;
        document.getElementById("overlay").innerHTML =
          Math.floor((curr_question_making / count_questions) * 100) + "%";
      }
    );
  } else {
    translate_models();
  }
}

function load_models(input) {
  curr_chosen_model = input;
  console.log("load_models(" + curr_chosen_model + ")");
  str_questions = "";
  str_answers = "";
  str_truths = "";
  str_outcome = "";
  arr_questions = [];
  build_increment = 0;
  get_model_increment = 0;
  answering_question_num = 0;
  inside_answer_set = 0;
  arr_arr_answers = [];
  true_p = 0;
  true_n = 0;
  false_p = 0;
  false_n = 0;
  hit = 0;
  miss = 0;
  count_questions = 0;
  curr_question_making = 0;
  supported_questions = 0;
  total_num_questions = 0;
  initial_diverse_colors();
  load_qa_truths();
  confusion_matrix_properties();
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
  document.getElementsByClassName("confusion-tile")[0].innerHTML =
    "TRUE POSITIVE: " + true_p;
  document.getElementsByClassName("confusion-tile")[1].innerHTML =
    "FALSE POSITIVE: " + false_p;
  document.getElementsByClassName("confusion-tile")[2].innerHTML =
    "TRUE NEGATIVE: " + true_n;
  document.getElementsByClassName("confusion-tile")[3].innerHTML =
    "FALSE NEGATIVE: " + false_n;
  document.getElementById("num-supported-questions").innerText =
    "Supported Questions: " + supported_questions + "/" + total_num_questions;
  document.getElementById("success-rate-outcome").innerText =
    Math.floor((hit / (hit + miss)) * 100, 2) + "%";
  document.getElementById("overlay").style.display = "none";
}

function answering_question(text, parameter_input) {
  console.log("answering_question()");
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

function color_translation(input) {
  //input a number divided by numphrases
  console.log("color_translation()");
  percent = Math.floor(input * 100, 2);
  if (percent == 0) {
    return "rgb(0,0,0)";
  } else if (percent <= 16.67) {
    return "rgb(" + Math.round((percent / 100) * 1530) + ",0,0)";
  } else if (percent <= 33.33) {
    return "rgb(255," + (Math.round((percent / 100) * 1530) - 255) + ",0)";
  } else if (percent <= 50) {
    return "rgb(" + Math.round(((percent / 100) * 1530) % 255) + ",255,0)";
  } else if (percent <= 66.67) {
    if (Math.round(((percent / 100) * 1530) % 255) + 255 <= 255) {
      return (
        "rgb(0,255," + (Math.round(((percent / 100) * 1530) % 255) + 255) + ")"
      );
    } else {
      return "rgb(0,255," + Math.round(((percent / 100) * 1530) % 255) + ")";
    }
  } else if (percent <= 83.33) {
    return "rgb(0," + Math.round(((percent / 100) * 1530) % 255) + ",255)";
  } else if (percent <= 100) {
    if (Math.round(((percent / 100) * 1530) % 255) + 255 <= 255) {
      return (
        "rgb(" + (Math.round(((percent / 100) * 1530) % 255) + 255) + ",0,255)"
      );
    } else {
      return "rgb(" + Math.round(((percent / 100) * 1530) % 255) + ",0,255)";
    }
  } else {
    return "rgba(0,0,0,0)";
  }
}

function context_cloud(input1, input2, input3) {
  total_num_questions++;
  if (input1.length > 1) {
    supported_questions++;
    occurrences = input1.reduce(function (acc, curr) {
      return acc[curr] ? ++acc[curr] : (acc[curr] = 1), acc;
    }, {});
    occurrences = JSON.stringify(occurrences)
      .replace(`{`, ``)
      .replace(`}`, ``)
      .replace(`"`, ``);
    cleansed_occurences = ``;
    for (i = 0; i < occurrences.length; i++) {
      if (occurrences[i] != `"`) {
        cleansed_occurences += occurrences[i];
      }
    }
    cleansed_occurences = cleansed_occurences.split(",");
    // console.log("input1: " + input1);
    input1_shortened = [];
    for (i = 0; i < input1.length; i++) {
      input1_shortened.push(input1[i].replace(/\s/g, ``));
    }
    shortened_occurences = [];
    for (i = 0; i < cleansed_occurences.length; i++) {
      shortened_occurences.push(cleansed_occurences[i].replace(/\s/g, ``));
    }
    assign_colors = [];
    for (i = 0; i < shortened_occurences.length; i++) {
      assign_colors.push(
        input2[input1_shortened.indexOf(shortened_occurences[i].split(":")[0])]
      );
    }
    // console.log("shortenedinput1:" + input1_shortened);
    // console.log("shortoccur1: " + shortened_occurences);
    // console.log("occur1: " + cleansed_occurences);
    // console.log("assign_colors: " + assign_colors);
    occurrences = occurrences.split(",");
    // console.log("original_occur: " + typeof occurrences);
    hold_arr = occurrences[0].split(":");
    hold_str = ``;
    for (i = 0; i < hold_arr[0].length; i++) {
      if (hold_arr[0][i] != `"`) {
        hold_str += hold_arr[0][i];
      }
    }
    word_cloud_data =
      `{"x":"` +
      hold_str.split(":")[0] +
      `", "value": ` +
      parseInt(occurrences[0].split(":")[1]) +
      `, category:"` +
      assign_colors[0] +
      `"}`;
    for (i = 1; i < occurrences.length; i++) {
      hold_arr = occurrences[i].split(":");
      hold_str = ``;
      for (h = 0; h < hold_arr[0].length; h++) {
        if (hold_arr[0][h] != `"`) {
          hold_str += hold_arr[0][h];
        }
      }
      word_cloud_data +=
        `, {"x":"` +
        hold_str +
        `", "value": ` +
        parseInt(hold_arr[1]) +
        `, category:"` +
        assign_colors[i] +
        `"}`;
    }
    distinct_colors = [];
    for (i = 0; i < assign_colors.length; i++) {
      if (distinct_colors.includes(assign_colors[i]) == false) {
        distinct_colors.push(assign_colors[i]);
      }
    }
    str_distinct_colors = `"` + distinct_colors[0] + `"`;
    for (i = 1; i < distinct_colors.length; i++) {
      str_distinct_colors += `,` + `"` + distinct_colors[i] + `"`;
    }

    word_cloud_data =
      `anychart.onDocumentReady(function() {
    var data=[` +
      word_cloud_data +
      `]
    var chart = anychart.tagCloud(data);
    var customColorScale = anychart.scales.ordinalColor();
    customColorScale.colors([` +
      str_distinct_colors +
      `]);
    chart.colorScale(customColorScale);
    chart.angles([0, 0, 0]);
    chart.container('word-cloud-` +
      input3 +
      `');
    chart.draw();});`;
    // console.log("word_cloud_data: " + word_cloud_data);
    eval(word_cloud_data);
  }
}
