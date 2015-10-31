<?php
	require ('index.php');
	$user = "";
	if(isset($_GET["gamescore"]) && isset($_GET["win"])){
		$endscore = $_GET["gamescore"];
		$haswon = $_GET["win"];
	}
	$sql = "SELECT * FROM UserTable";
	$result = sqlquery($sql);
	while(odbc_fetch_row($result)){
  	   $active = odbc_result($result, 8);
  	   if($active == 1){
  	   	 $user = odbc_result($result, 1);
  	   	 $gamesplayed = odbc_result($result, 3);
  	   	 $gameswon = odbc_result($result, 4);
  	   	 $gameswon++;
  	   	 $gamesplayed++;
         $playedsql = "UPDATE UserTable SET GamesPlayed=$gamesplayed WHERE Username='$user'";
         sqlquery($playedsql);
         $wonsql = "UPDATE UserTable SET GamesWon=$gameswon WHERE Username='$user'";
         sqlquery($wonsql);
         $scoresql = "UPDATE UserTable SET CurrentScore=$endscore WHERE Username='$user'";
         sqlquery($scoresql);
         if(odbc_result($result,6) < $endscore){
           	$highsql = "UPDATE UserTable SET HighestScore=$endscore WHERE Username='$user'";
           	sqlquery($highsql);
         }
  	  }
  	}
    $tablequery = "SELECT * FROM UserTable";
    $tableresult = sqlquery($tablequery);
    echo "<table border=1>
    <tr>
    <th>User</th>
    <th>Games Played</th>
    <th>Games Won</th>
    <th>Current Score</th>
    <th>Highest Score</th>
    </tr>";
  while(odbc_fetch_row($tableresult)){
    echo "<tr>";
    echo "<td>" . odbc_result($tableresult,1) . "</td>";
    echo "<td>" . odbc_result($tableresult,3) . "</td>";
    echo "<td>" . odbc_result($tableresult,4) . "</td>";
    echo "<td>" . odbc_result($tableresult,5) . "</td>";
    echo "<td>" . odbc_result($tableresult,6) . "</td>";
    echo "</tr>";
  }
  echo "</table>";
?>