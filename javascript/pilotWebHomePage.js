// javascript used in the queryHomePage.jsp

//helper method that checks for numerics - returns true if field is numeric
function checkNumerics(string) {
   
 var Chars = "0123456789";

 //check string for numerics

 for (var i = 0; i < string.length; i++) {
       if (Chars.indexOf(string.charAt(i)) == -1)
          return false;
  }

    	
   return true; 
 }		

function LTrim( value ) {
	
	var re = /\s*((\S+\s*)*)/;
	return value.replace(re, "$1");
	
}

// Removes ending whitespaces
function RTrim( value ) {
	
	var re = /((\s*\S+)*)\s*/;
	return value.replace(re, "$1");
	
}

// Removes leading and ending whitespaces
function trim( value ) {
	
	return LTrim(RTrim(value));
	
}


//helper method to remove leading and trailing spaces 
function trimWhitespace(str)
{  while(str.charAt(0) == (" ") )
  {  str = str.substring(1);
  }
  while(str.charAt(str.length-1) == " " )
  {  str = str.substring(0,str.length-1);
  }
  return str;
}



// used for NOTAM Retrieval function
function validateIcao(icaos, formatType) {

var icaos=document.forms[0].retrieveLocId.value; 
//remove special characters and replace with a space
icaos = icaos.replace(/\n/,' ');
icaos = icaos.replace(/\r/,' ');
icaos = icaos.replace(/\t/,' ');
//trim consecutive spaces down to one space
icaos = icaos.replace(/(\s(?!(\n|\r))(?=\s))+/g,'');
//remove leading and trailing spaces
icaos = trimWhitespace(icaos);

if (icaos.length < 1) {
    alert("No locations were entered!");
    document.forms[0].retrieveLocId.focus();
    return false;
    }

if (!icaos.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
	alert("Location must be an alphanumeric value!");
	 return false;
}

icaos = icaos.split(/\W+/);  

if (icaos.length > 50) {
	alert("Your request contains " + 
	icaos.length + 
	" locations, you are limited to 50 locations, please modify your request.");
    document.forms[0].retrieveLocId.focus();
    return false;
    }

   if(formatType != null && formatType == "ICAO")
   {   
    var len = icaos.length;
    var invalidIDs ="";
   	for (var i=0; i<len; i++)
   	{
	   	if(icaos[i].length != 4)
	   	{
	   		invalidIDs = invalidIDs + icaos[i];
	   		invalidIDs = invalidIDs + " ";
	   	}	   	
   	}
   	
   	
   	
   	
   	if(trim(invalidIDs).length >0)
	   	{
	   		alert("Your request contains following invalid locations.\n" + invalidIDs);
	   		document.forms[0].retrieveLocId.focus();
	   		return false;
	   	}
	   
   }    	
   return true; 
 }
 
 function validateNotamByID(accountID, notamIDPart1, notamIDPart2) {
   
    var errorMesg="";
	if(accountID == null || trim(accountID).length <1)
	{
		errorMesg = errorMesg+"No Accountability or Location was entered.\n";
	}else{

		if (!accountID.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
			errorMesg = errorMesg+"Accountability/Location must be an alphanumeric value!\n";
			
		}
	
	}
	if(notamIDPart1 == null || trim(notamIDPart1).length <1)
	{
		errorMesg = errorMesg+"No 1st part of NOTAM # was entered.\n";
	}else{

		if (!notamIDPart1.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
			errorMesg = errorMesg+"NOTAM Number must be an alphanumeric value!\n";
			
		}

	}
	if(notamIDPart2 == null || trim(notamIDPart2).length <1)
	{
		errorMesg = errorMesg+"No 2nd part of NOTAM # was entered.\n";
	}else{

		if (!notamIDPart2.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
			erorMesg = errorMesg+"NOTAM Number must be an alphanumeric value!\n";
		}

	}
	if(errorMesg != null && errorMesg.length > 0)
	{
	alert(errorMesg)
	return false;
	}    	
   return true; 
 }

//used to validate Geographical Radius Search (ICAO Radius Search) 
function validateIcaoRadius(locationID, radius) {
var message = "";
var formOK = true; 

//changed to support Netscape 
var inputField = document.getElementsByTagName("input");
var icaos = locationID.replace(/\s/g,'');
var radius = radius.replace(/\s/g,'');

var minRadius = 2;
var maxRadius = 500;

if (icaos.length < 1) {
    message += "No location was entered!\n\n";
    formOK = false;
    }else{//check special character
    	if (!icaos.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
    		message += "Location must be an alphanumeric value!\n\n";
    		 formOK = false;
    		
    	}

    }
    
if (radius.length < 1) {
    message += "No Radius was entered!\n\n";
    formOK = false;
    } else {    

    //check radius for numerics
 
    if ( isNaN(radius) ) {
       message += "Radius must be a numeric value!\n\n";
       formOK = false;
     } else {

    //check for valid value

     if ((radius < minRadius) || (radius > maxRadius)) {
	    message += "Radius must be between " + 
	    minRadius + 
	    " and " +
	    maxRadius +
	    " Nautical Miles!";
        formOK = false;
       }
      }
     }

 if (formOK == false) {
	 alert(message);
	} 
    	
   return formOK; 
 }	

//used to validate Geographical Radius Search (Lat./Long Radius Search) 
function validateLatLongRadius() {
 
var message = "";
var formOK = true; 

//changed to support Netscape
var inputField = document.getElementsByTagName("input");
var latDegree = inputField["geoLatDegree"].value.replace(/\s/g,'');
var latMinute = inputField["geoLatMinute"].value.replace(/\s/g,'');
var longDegree = inputField["geoLongDegree"].value.replace(/\s/g,'');
var longMinute = inputField["geoLongMinute"].value.replace(/\s/g,'');
var radius = inputField["geoLatLongRadius"].value.replace(/\s/g,'');
var minRadius = 2;
var maxRadius = 500;

if (latDegree.length < 1) {
    message += "No Latitude degrees were entered!\n\n";
    formOK = false;
    } else {
      //check degrees for numerics
     if (!(checkNumerics(latDegree))) {
        message += "Latitude degrees must be a numeric value!\n\n";
        formOK = false;
    } 
   
    if ((latDegree < 0) || (latDegree > 90)) {
       
	   message += "Latitude degrees must be between 0 and 90!\n\n";
       formOK = false;
      }
     
    }
 
 if (latMinute.length < 1) {
    message += "No Latitude minutes were entered!\n\n";
    formOK = false;
    } else {
      //check minutes for numerics
     if (!(checkNumerics(latMinute))) {
        message += "Latitude minutes must be a numeric value!\n\n";
        formOK = false;
    }
    if ((latMinute < 0) || (latMinute > 60)) {
	   message +="Latitude minutes must be between 0 and 60!\n\n";
       formOK = false;
       } else {
        if ((latDegree == 90) || (latMinute > 60)) {
	   message += "Latitude must be between 0 degrees and 90 degrees!\n\n";
       formOK = false;
      } 
      }   
      
      
   }

if (longDegree.length < 1) {
    message += "No Longitude degrees were entered!\n\n";
    formOK = false;
    } else {
      //check degrees for numerics
     if (!(checkNumerics(longDegree))) {
        message += "Longitude degrees must be a numeric value!\n\n";
        formOK = false;
    } else {
      if ((longDegree < 0) || (longDegree > 180)) {
    
	    message += "Longitude degrees must be between 0 and 180!\n\n";
        formOK = false;
       }
     }  
     
    }
 
 if (longMinute.length < 1) {
    message += "No Longitude minutes were entered!\n\n";
    formOK = false;
    } else {
      //check minutes for numerics
     if (!(checkNumerics(longMinute))) {
        message += "Longitude minutes must be a numeric value!\n\n";
        formOK = false;
    }
    if ((longMinute < 0) || (longMinute > 60)) {
	   message +="Longitude minutes must be between 0 and 60!\n\n";
       formOK = false;
      } else {
       if ((longDegree == 180) || (longMinute > 60)) {
	      message += "Longitude must be between 0 degrees and 180 degrees!\n\n";
          formOK = false;
        }    
      }
      
   }

 
    
if (radius.length < 1) {
     message += "No Radius was entered!\n\n";
     formOK = false;
    } else {   
  
   //check radius for numerics
   // if (!(checkNumerics(radius))) {
   if ( isNaN(radius) ) {
      message += "Radius must be a numeric value!";
     formOK = false;
    } else {

     if ((radius < minRadius) || (radius > maxRadius)) {
	    message +=  "Radius must be between " + 
	     minRadius + 
	     " and " +
	     maxRadius +
	     " Nautical Miles!";
        formOK = false;
       }
    } 
}
    	
   if (formOK == false) {
	 alert(message);
	} 
				
return (formOK);
 }		
//used to validate Geographical Radius Search (Flight Path Search) 
function validateFlightPathSearch(radioCT) {

var message = "";
var formOK = true; 

//changed to support Netscape
var inputField = document.getElementsByTagName("input");
var icaos1 = inputField["geoFlightPathIcao1"].value.replace(/\s/g,'');
var icaos2 = inputField["geoFlightPathIcao2"].value.replace(/\s/g,'');
var icaos3 = inputField["geoFlightPathIcao3"].value.replace(/\s/g,'');
var icaos4 = inputField["geoFlightPathIcao4"].value.replace(/\s/g,'');
var icaos5 = inputField["geoFlightPathIcao5"].value.replace(/\s/g,'');
var radius = inputField["geoFlightPathbuffer"].value.replace(/\s/g,'');
var chksEnroute = inputField["geoFlightPathEnrouteOption"];
var chksRegulatory = inputField["geoFlightPathRegulatoryOption"];
//var radioCT = inputField["geoFlightPathOptionsCT"];
var minRadius = 2;
var maxRadius = 100;
var checked = false; 
var radioChecked = -1;
var counter = 0; 


//check to make sure an ICAO is entered
if ((icaos1.length < 1) &&
    (icaos2.length < 1) &&
    (icaos3.length < 1) && 
    (icaos4.length < 1) &&
    (icaos5.length < 1))
 {
    
    message += "No locations were entered!\n\n";
    formOK = false;
    }else{
    	if(icaos1.length>0){

        	if (!icaos1.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
        		message += "Location must be an alphanumeric value!\n\n";
        		 formOK = false;
        		
        	}
	
    	}
    	if(formOK && icaos2.length>0){

        	if (!icaos2.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
        		message += "Location must be an alphanumeric value!\n\n";
        		 formOK = false;
        	}
 	
    	}
    	if(formOK && icaos3.length>0){

        	if (!icaos3.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
        		message += "Location must be an alphanumeric value!\n\n";
        		 formOK = false;
        		 
        	}
	
    	}
    	if(formOK && icaos4.length>0){

        	if (!icaos4.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
        		message += "Location must be an alphanumeric value!\n\n";
        		 formOK = false;
        		
        	}
 	
    	}
    	if(formOK &&  icaos5.length>0){
        	if (!icaos5.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
        		message += "Location must be an alphanumeric value!\n\n";
        		 formOK = false;
        		
        	}
    	}

    }

if (formOK == false) {
	 alert(message);
	 return formOK
} 


checked = false;    
if((chksEnroute != null && chksEnroute.checked) || (chksRegulatory != null && chksRegulatory.checked) )
{
	checked = true;
}

//now check if any Includes were selected.  If so - additional edits need to occur. 
    //first check multibox 
      // var chks = document.forms[21].geoFlightPathOptionsAR;
     //  if (chks){ //checkbox(s) exists
    //    checked = false; 
		
	//	if (chks.length){ //multiple checkboxes
	//		var len = chks.length;
	//		for (var i=0; i<len; i++){
	//			if (chks[i].checked){
	//				checked = true;
	//				break;
	//			}
	//		}
	//	}
	//	else{ //single checkbox only
		
	//		checked = chks.checked;
	//	}
	//}


//now check radio button for ARTCCs/UIRs/FIRs and FDC TFR Notices Only
 if(radioCT != null)
 {
 
	 for (i=radioCT.length-1; i > -1; i--) {	 
	  if (radioCT[i].checked) {
	   radioChecked = i; i = -1;
	  }
	 }
 }

if (checked || radioChecked != -1)  {

    //now let's see how many ICAOs were entered - must have 2 or more
    if (icaos1.length > 0) {counter++;}
    if (icaos2.length > 0) {counter++;}
    if (icaos3.length > 0) {counter++;}
    if (icaos4.length > 0) {counter++;}
    if (icaos5.length > 0) {counter++;}
    
   
    
    if (counter < 2) {
       message += "At least two locations must be entered to perform a Flight Path search!\n\n";
       formOK = false;
    }
  }
    if (radius.length < 1) {
       message += "No Radius was entered!\n\n";
       formOK = false;
    }else {   
  
   //check radius for numerics
     // if (!(checkNumerics(radius))) {
      if ( isNaN(radius) ) {
         message += "Radius must be a numeric value!";
         formOK = false;
     }else {

        if ((radius < minRadius) || (radius > maxRadius)) {
	      message +=  "Radius must be between " + 
	      minRadius + 
	      " and " +
	      maxRadius +
	      " Nautical Miles!";
          formOK = false;
        }
     }  
   }


if (formOK == false) {
	 alert(message);
} 
				
return (formOK);
}		

////used to validate DINS ARTCC Notices, TFRs and Special Notice Page

function validateCenterNotices() {
var boxCheck = false;
if (document.forms[5].fdc.checked) {
boxCheck = true; }
var multiCheckbox = false;
for (i = 0; i < document.forms[5].centerLocationIDs.length; i++) {
if (document.forms[5].centerLocationIDs[i].checked)
multiCheckbox = true; }


//issue error, if no center locations are selected and Regulatory is not checked.
if ((!multiCheckbox) && (!boxCheck)) {
    alert("No locations were selected.");
    return false;
}

return true; 

 
}

 