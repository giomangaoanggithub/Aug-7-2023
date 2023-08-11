<?php

include '../mysql/db_connection.php';

$question_id = $_POST["question_id"];
$hps = $_POST["hps"];

try {
    $sql = "UPDATE questions SET HPS = '$hps' WHERE question_id=$question_id";
  
    // Prepare statement
    $stmt = $conn->prepare($sql);
  
    // execute the query
    $stmt->execute();
  
    // echo a message to say the UPDATE succeeded
    echo "HPS UPDATED successfully";
  } catch(PDOException $e) {
    echo $sql . "<br>" . $e->getMessage();
  }
  
  $conn = null;
?>