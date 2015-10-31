<?php
require ('index.php');
// define variables and set to empty values
$usernameErr = $emailErr = $passErr = "";
$user = $mail = "";
$pass = "";
   if (empty($_POST["username"])) {
		$usernameErr = "Name is required";
   } 
   else {
       $user = test_input($_POST["username"]);
   }
   
   if (empty($_POST["email"])) {
     $emailErr = "Email is required";
   } 
   else {
     $mail = test_input($_POST["email"]);
     // check if e-mail address is well-formed
     if (!filter_var($mail, FILTER_VALIDATE_EMAIL)) {
       $emailErr = "Invalid email"; 
     }
   }
   if (empty($_POST["password"])) {
    $passErr = "Password is required";
   } 
   else {
       $pass = test_input($_POST["password"]);
   }

   $sql = "INSERT INTO UserTable(Username,Password,Email,GamesPlayed,GamesWon,CurrentScore,HighestScore,Active) 
           VALUES('$user','$pass','$mail',0,0,0,0,0)";
   sqlquery($sql);
   header("Refresh: 2, URL=login.html");
function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
?>