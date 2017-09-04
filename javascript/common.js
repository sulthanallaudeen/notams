// This global variable is used to pass back the selected date from the date picker.

function checkAll (el, checked) {
	//var el = document.getElementById(id);
	if(el!=null)
	{
		for (var i = 0; i < el.elements.length; i++) 
		{
		
		  el.elements[i].checked = checked;
		}
	}
 }
    
 function validateForData(icaos) {
icao2 = icaos.value.replace(/^\s+/g, '').replace(/\s+$/g, '');
if (icao2.length < 1) {
    alert("No ICAOs were entered!");
    icaos.focus();
    return false;
    }else{//check for special character

    	if (!icao2.match(/^[0-9a-zA-Z\d\s\n\r\t]+$/)){
    		alert("Location must be an alphanumeric value!");
    		icaos.focus();
    		 return false;
    	}
  	
    }
   	
   return true; 
 }
	  
function icaoCheckAll(chk, checked)
{
	if( chk !=null)
	{
  		for (i = 0; i < chk.length; i++)
		{
			chk[i].checked = checked ;
		}			
	}
}



function isAlphabeticSpace(val)
{
	if (val.match(/^[0-9a-zA-Z' ']+$/))
	{
		return true;
	}
	else
	{
		return false;
	} 
}
	
function sortNotamListing(sortKey,sortKeyword) {
		var url = window.location.protocol + "//" + window.location.hostname + ":" + window.location.port + window.location.pathname; 
		var querystring = window.location.querystring; 
		var method    = querystring["method"];    // == "seattle"
		
		if(method != null)
		{
 			url = url + "?method=" + method;
 		}

	/**	var params = window.location.search;
		if( params != null && params.length >0)
		{
			var endIndex = params.indexOf("&");			
			if(endIndex == -1)
			{
				endIndex = params.length;
			}			
			url = url+params.substring(url.indexOf('?'), ( endIndex));			
		}*/
		var queryParams = 'SORT='+ sortKey;		
		if(url.indexOf('?')!= -1)
		{
			queryParams = "&"+queryParams;			
		}
		else
		{
			queryParams = "?"+queryParams;
		}
					
		if(sortKeyword!=null && sortKeyword.length > 0)
		{
			
			sortKeyword = sortKeyword.replace(/(\s(?!(\n|\r))(?=\s))+/g,'');
			if( ! isAlphabeticSpace(sortKeyword) )
			{			
					alert("The special characters other than space are not allowed in Keyword Sort.");
					return false;				
			}			
			queryParams= queryParams+"&sortKeyword="+escape(sortKeyword);
		}			
        window.location= url+queryParams;      
 } 
 
 function openGraphicalNOTAMWindow(icaoID) {
 	var targetAction = "viewGraphicalNotam.do?icaoID=" + icaoID;
	gNOTAMWindow = window.open(targetAction,'viewGNotam','toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=yes,width=880,height=770,left=300,top=40');
	gNOTAMWindow.focus();
} 

//Added on 10/27/2009


	
	

	function switchLinksMenu(obj) 
	{
	
	var el = document.getElementById(obj);
		el.style.display = (el.style.display != "none") ?'none':'';	
   };

   function switchMenu(parent, elementID) {	
		var child = document.getElementById(elementID);
		var parent = document.getElementById(parent);
		if(child != null && parent!=null)
		{
			var className = parent.className;	
			className = child.style.display != "none"? className.replace("open","collapse"):className.replace("collapse","open");	
			child.style.display = (child.style.display != "none") ?'none':'';		
			parent.className =className;
		}		
   };
   
    function setOpenedMenuItems(openMenuItems) {	
    	var parents=new Array("icaosHeader","icaoHead","radiusHeader","latLongHead","flightPathHeader", "centersHeader", "icaoLookupHeader", "rightNavSec0", "rightNavSec1", "rightNavSec2", "rightNavSec3","rightNavSec4","rightNavSec5");
    	var children=new Array("icaos","icao","radius","latLong","flightPath","centers", "icaoLookup", "rightNavSecBorder0", "rightNavSecBorder1", "rightNavSecBorder2", "rightNavSecBorder3","rightNavSecBorder4","rightNavSecBorder5");
    	var openItems = "";
    	for (i =0 ; i<parents.length; i++)
    	{
    		var parent = document.getElementById(parents[i]);
    		if(parent!=null)
    		{
	    		var className = parent.className;
	    		if(className!= null && className.search(/open/i)!= -1)
	    		{
	    			openItems = openItems + parents[i]+"," + children[i] + ":";
	    		}
	    	}
    	}
    	//var inputField = document.getElementsByTagName("input");
    	openMenuItems.value = openItems    	   					
		return openItems;	
   };
   
   function openMenuItems(openItems) {  
    	if(openItems != null)
    	{
    		var parentChildren = openItems.split(":");
	    	for (i =0 ; i<parentChildren.length; i++)
	    	{
	    		var parentChild = parentChildren[i].split(",");
	    		if(parentChild.length == 2)
	    		{
	    			switchMenu(parentChild[0], parentChild[1]);
	    		}
	    	}
	    }				
   };
   

   function toggleTitle(bool,element) {
			//true = open, false = closed
			var title = (bool) ? "Click to collapse" : "Click to expand";
			element.attr("title",title);
			};

	function submitForm(action) {			
		if (action != null ) 
		{
			document.notamRetrievalResponseForm.action = action;
		}			
	}
	
	window.location.querystring = (function() {
 
    // by Chris O'Brien, prettycode.org
 
    var collection = {};
 
    // Gets the query string, starts with '?'
 
    var querystring = window.location.search;
 
    // Empty if no query string
 
    if (!querystring) {
        return { toString: function() { return ""; } };
    }
 
    // Decode query string and remove '?'
 
    querystring = decodeURI(querystring.substring(1));
 
   // Load the key/values of the return collection
 
    var pairs = querystring.split("&");
 
    for (var i = 0; i < pairs.length; i++) {
 
        // Empty pair (e.g. ?key=val&&key2=val2)
 
        if (!pairs[i]) {
            continue;
        }
 
        // Don't use split("=") in case value has "=" in it
 
        var seperatorPosition = pairs[i].indexOf("=");
 
        if (seperatorPosition == -1) {
            collection[pairs[i]] = "";
        }
        else {
            collection[pairs[i].substring(0, seperatorPosition)] 
                = pairs[i].substr(seperatorPosition + 1);
        }
    }
 
    // toString() returns the key/value pairs concatenated
 
    collection.toString = function() {
        return "?" + querystring;
    };
 
    return collection;
})();