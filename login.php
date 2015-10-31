<?php
require ('index.php');
// define variables and set to empty values
$usernameErr = $passErr = "";
$user = "";
$pass = "";
$currentname = "";
$currentpass = "";
$flag = FALSE;
if ($_SERVER["REQUEST_METHOD"] == "POST") {
   if (empty($_POST["username"])) {
		$usernameErr = "Name is required";
   } 
   else {
       $user = test_input($_POST["username"]);
   }
   
   if (empty($_POST["password"])) {
    $passErr = "Password is required";
   } 
   else {
       $pass = test_input($_POST["password"]);
   }
   $sql = "SELECT * FROM UserTable";
   $result = sqlquery($sql);
   $sql = "UPDATE UserTable SET Active=0";
   sqlquery($sql);
   while(odbc_fetch_row($result)){
  	   $currentname = odbc_result($result, 1);
  	   $currentpass = odbc_result($result, 2);
  	   if($currentname == $user && $currentpass == $pass){
  		   $flag = TRUE;
         $activesql = "UPDATE UserTable SET Active=1 WHERE Username ='$user'";
         sqlquery($activesql);
  		   header("Refresh: 2; URL= tripeaks.html"); 
  		   die ("Logging in");
  		   exit;
  	   }
   }
   if($flag == FALSE){
			header("Refresh: 2; URL= login.html");
			die ("Invalid username and/or password");
			exit;
		}
}
function test_input($data) {
   $data = trim($data);
   $data = stripslashes($data);
   $data = htmlspecialchars($data);
   return $data;
}
?>