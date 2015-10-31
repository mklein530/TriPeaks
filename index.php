<?php
function connect() {
	$dsn = "database";
	$user = "";
	$password = "";
	
	$dbconnect = odbc_connect($dsn,$user,$password);
	return $dbconnect;
}

function sqlquery($sql) {
	$dbconnect = connect();
	$queryResult = odbc_exec($dbconnect,$sql);
	return $queryResult;
}

?>