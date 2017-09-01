<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET');
$url = "https://pilotweb.nas.faa.gov/PilotWeb/notamRetrievalByICAOAction.do?method=displayByICAOs&reportType=RAW&formatType=ICAO&retrieveLocId=VOMM&actionType=notamRetrievalByICAOs";
echo file_get_contents($url);
?>