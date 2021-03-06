<html>
<title>NOTAM - Notice to Airmen : Retrieval API</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">
<style>
body,html{
  overflow:hidden
}
#checkBoxLeft{
    display:none;
}
#resultsHomeLeft{
    width:50%;
}
#resultsSort{
    display:none;
}
</style>
<div class="row">
<div class="col-md-4">
</div>
<div class="col-md-4">
<br>
<?php
if($_GET){
    $code = $_GET['code'];
    $code = strtoupper($code);
}
else{
    $code = "";
}
?>
<h2>NOTAM Retrieval API</h2>
<p style="float:right"><a target="_new" href="https://pilotweb.nas.faa.gov/PilotWeb/">Source</a></p>
<form method="GET" action="">
  <div class="form-group">
    <label for="email">ICAO Name:</label>
    <input type="text" class="form-control" id="email" name="code" required value="<?php echo $code?>">
  </div>
  <button type="submit" class="btn btn-default">Submit</button>
</form>
</div>
<div class="col-md-4">
</div>
</html>
<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
if($_GET){
if($_GET['code']==''){
    $error ="Code should not be empty";
    echo $error;
}
else{
$url = "https://pilotweb.nas.faa.gov/PilotWeb/notamRetrievalByICAOAction.do?method=displayByICAOs&reportType=RAW&formatType=ICAO&retrieveLocId=".$_GET['code']."&actionType=notamRetrievalByICAOs";
$data =  file_get_contents($url);
echo $data;
}
}
else{
    $error ="Invalid Access";
    //echo $error;
}
?>