<?php
$url = "https://pilotweb.nas.faa.gov/PilotWeb/notamRetrievalByICAOAction.do?method=displayByICAOs&reportType=RAW&formatType=ICAO&retrieveLocId=VOMM&actionType=notamRetrievalByICAOs";
$data =  file_get_contents($url);
echo $data;
?>