<?php
include "foreign/list_of_stopwords.php";
include "foreign/porter2-master/demo/process.inc";
include "foreign/remove_nonsimpletext.php";
include "foreign/prevent_unwantedunicode.php";

include "nlp_step2_text_cleaning.php";

$question = $_POST["find_question"];
// $question = "What is Centrifugal force?";


$question = array($question);

$files_list = scandir("demo/demoman/models");
$cleansed_file_list = array();

// print_r($files_list);

for($i = 2; $i < count($files_list); $i++){
    array_push($cleansed_file_list, $files_list[$i]);
}

// print_r($cleansed_file_list);

$stemmed_question = array_values(array_filter(array_unique(explode(" ", nlp_step2_text_cleaning($question)[1][0]))));

$filename = "";

for($i = 0; $i < count($stemmed_question); $i++){
    $filename .= $stemmed_question[$i];
}

if(in_array($filename.".txt", $cleansed_file_list)){
    echo file_get_contents("demo/demoman/models/$filename.txt");
} else {echo "none";}
?>