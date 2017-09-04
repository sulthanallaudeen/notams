//DOCUMENT SEARCH VALIDATION
	function validateDocumentSearchForm(){
		var searchCriteriaField = $("#wfq");
		var messageContainer = $("#messageContainer");
		var displayStatusField = $("#display").val();
		//If the document search is for Orders/Notices then set the flag to TRUE, otherwise FALSE.
		var cancelledRequiresCriteria = (searchCriteriaField.parents("#formSearchDirectives").length > 0) ? true : false;
		//Set the default text
		var defaultText = 'Search Content, Number, Title, Description, or Office';
		//Is the current value, the default text
		var isDefault = (searchCriteriaField.val() == defaultText) ? true : false;
		//If it isn't the default text is it greater than 3 chars
		var isEnoughChars = (!isDefault && searchCriteriaField.val().length >= 3) ? true : false;
		//Default to VALID
		var isValidated = true;
		//Param the error string
		var errorMessage = '';
		//Remove any existing error messages
		$("#docSearchError").remove();
		searchCriteriaField.removeClass("error");
		//INVALID if cancelled requires criteria, and status selected includes cancelled docs, and the search criteria is the default text or less than 3 chars
		if( cancelledRequiresCriteria && ( isDefault || !isEnoughChars ) && displayStatusField != 'current'){
			isValidated = false;
			errorMessage = errorMessage + '<p>Due to the large number of cancelled documents, please limit your search by typing text or a number (at least 3 characters).</p>';
			//errorMessage = (isDefault) ? errorMessage + '<li>To provide better search results, please type three or more characters.</li>' : errorMessage;
		};
		//INVALID if the search criteria is NOT the default text and NOT greater than 3 chars
		if( !isDefault && !isEnoughChars ){
			isValidated = false;
			errorMessage = errorMessage + '<p>To search within all current documents, you must type at least 3 characters.</p>';
		};
		//If INVALID, display error field and stop processing.
		if(!isValidated){
			//Display errors
			messageContainer.addClass("error").removeClass("lightGrey");
			$("<div/>").attr("id","docSearchError").addClass("message-box").addClass("failure").html(errorMessage).prependTo("#messageContainer");
			return false;
		}
		//If VALID then get on with your bad self.
		else{
			return true;
		};
	};

//N-NUMBER SEARCH VALIDATION
	function validateNnumberForm(){
		//Add the info about N-Numbers
		var innerHtml = '<div id="nNumErrorMessage" class="message-box info"><p class="first">Type up to five alphanumeric characters, and then click <strong>Go</strong>.</p><p style="margin-top: 8px;">An N-Number:</p><ul><li>Cannot include:<ul><li>a zero as the first digit</li><li>the letters I or O</li></ul></li> <li>Can be in any of these formats: <ul><li>one to five numbers (N12345)</li><li>one to four numbers followed by one letter (N1234Z)</li><li>one to three numbers followed by two letters (N123AZ)</li></ul></li></ul><p class="right"><a href="#" class="closeWindow">Close</a></p></div>';

		$("#nNumberWidget #helpIcon").toggle(function(){
			//First Click: Add the message box
			$("#nNumErrorMessage").remove();
			$("#nNumberWidget fieldset").append(innerHtml);
				if($.browser.msie) {
					$("#ajaxContent #nnlinkList").hide();
				};
			$("#nNumErrorMessage .closeWindow").bind("click", function(){
				if($.browser.msie) {
					$("#ajaxContent #nnlinkList").show();
				};
				$("#nNumErrorMessage").remove();
				return false;
			});
			},function(){
			//Second Click: Remove the message box
			if($.browser.msie) {
					$("#ajaxContent #nnlinkList").show();
				};
			$("#nNumErrorMessage").remove();
				return false;
			});

		//Clear out the N
		$("#NNumbertxt").bind("blur", function() {
			var nNumber = $(this).val().toUpperCase();
			var nNumberRE = /^[^\d]*(.*)$/;
			var nNumber = nNumber.replace(nNumberRE,"$1");
			$("#nNumErrorMessage").remove();
			$(this).val(nNumber);
			});
		//Bind the nNumber submit button
		$("#nNumberWidget").bind("submit", function() {
			//Trigger the blur event to fix any N and N- issues
			$("#NNumbertxt").blur();
			//Save the error code.
			var errorHtml = 'Please try again.';
			var nNumber = $.trim($("#NNumbertxt").val().toString().toUpperCase());	//Uppercase and trim the number entered.
			//var nNumberRE = /^[1-9]\d?\d?(?:[A-HJ-NP-Z]{1,2}|\d[\dA-HJ-NP-Z]?)$/; ^[1-9](?:\d{1,4}|\d{1,3}[A-HJ-NP-Z]{1,2})?$	//RegEx that meets all the requirements as laid out in the errorMessage above
			var nNumberRE = /^[1-9](?:[A-HJ-NP-Z]{1,2}|\d{1,4}|\d{1,2}[A-HJ-NP-Z]{1,2}|\d{3}[A-HJ-NP-Z])?$/; //RegEx that meets all the requirements as laid out in the errorMessage above
			var isValidNNumber = nNumber.search(nNumberRE);						//Returns -1 if not valid
			if ( isValidNNumber < 0 ) {
				//Error
					$("#nNumberWidget fieldset").append(innerHtml);
					$("#nNumErrorMessage .first").empty().html(errorHtml);
					$("#nNumErrorMessage").removeClass("info").addClass("failure");
					if($.browser.msie) {
						$("#ajaxContent #nnlinkList").hide();
						};
					$("#nNumErrorMessage .closeWindow").bind("click", function(){
						if($.browser.msie) {
							$("#ajaxContent #nnlinkList").show();
						};																    
						$("#nNumErrorMessage").remove();
						return false;
					});
					return false;
				} else {
				//Success
				return true;
				};
		});
		//Bind the nNumber submit button
		$("#homeLeftRight").bind("mouseleave", function() {
			//Trigger the blur event to fix any N and N- issues
			$("#NNumbertxt").blur();
		});
	};
//Ready open
$(document).ready(function(){
	//******** Rounding Content ********
	$(".roundAll").corner("6px");
	$(".roundTop").corner("top 6px");
	$(".roundBottom").corner("bottom 6px");
	$(".roundTopLeft").corner("tl 6px");
	$(".roundTopRight").corner("tr 6px");
	$(".roundBottomLeft").corner("bl 6px");
	$(".roundBottomRight").corner("br 6px");

	//******** Table Striping **********
	$("table.striped tbody tr.alt-bg, table.striped tbody tr.alt-bg").removeClass("alt-bg").removeClass("altBg");
	$("table.striped tbody tr:nth-child(even)").addClass("alt-bg");

	//******** Subnav Tab Hover ********

	$("#hNav > ul > li").hover(function(){

		//Add hover class for IE6
		if (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6) {
			$(this).addClass("hover");
			if($(this).hasClass("active")){
				$(this).addClass("hoverActive");
			}
			if($(this).is(":first-child")){
				$(this).addClass("firstHover");
			}else if($(this).is(":last-child")){
				$(this).addClass("lastHover");
			}
		}
		//Show dropdown
		$(this).children().filter("div.one").show().bgiframe();

	}, function(){
		//Add hover class for IE6
		if (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6) {
			$(this).removeClass("hover");
			if($(this).hasClass("hoverActive")){
				$(this).removeClass("hoverActive");
			}
			if($(this).is(":first-child")){
				$(this).removeClass("firstHover");
			}else if($(this).is(":last-child")){
				$(this).removeClass("lastHover");
			}
		}
		//Hide dropdown
		$(this).children().filter("div.one").hide();
	});
		//All Visitor Hover
		$("#topNav li.allVisitors").hover(function(){
			//Add hover class for IE6
			if (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6) {
				$(this).addClass("hover");
			}

			//Show dropdown
			$(this).children().filter("div").show();

		}, function(){
			//Add hover class for IE6
			if (jQuery.browser.msie && parseInt(jQuery.browser.version) == 6) {
				$(this).removeClass("hover");
			}

			//Hide dropdown
			$(this).children().filter("div").hide();
		});

	//******** Toggle Stylesheet ********
	(function($) {
		$.toggleStylesheet = function(toggle,options) {
		var settings = $.extend({
			headerId: "printPage",
			headerClass: "pageDialog stackable clear",
			headerContent: '<h2>Printer-Friendly Version</h2>'
						+ '<p>When you print this page, no menus or screen elements will appear (as shown below), and this message will not be included.</p>'
						+ '<p>To continue, click <strong>Print</strong>. To return to the normal view of this page, click <strong>Cancel</strong>.</p>'
						+ '<p><input type="button" class="primary button" value="Print" onclick="window.print();" />'
						+ '<input type="button" class="secondary button" value="Cancel" /></p>',
			headerTarget: "body",
			footerTarget: "#footer",
			normalStyleTarget: "#cssStandard",
			printStyleTarget: "#cssPreview"
			}, options||{});
		if (toggle) {
			//Clear out any existing header with that ID
			$(settings.headerId).remove();
			//Create the header
			$("<div/>").attr("id",settings.headerId).addClass(settings.headerClass).html(settings.headerContent).prependTo(settings.headerTarget);
			//FAA Only: Clone the logo link and move the image from background to included element
			//$("#logoLink").clone().html('<img src="/images/new/head_logo_print.gif">').attr("id","logoLinkPrint").prependTo("#head");
			//Create a P populate it with the page URL and put it in the footer
			//$("<p/>").attr("id",settings.footerLinkId).html("This page can be accessed via the URL: <br /> " + window.location).prependTo(settings.footerTarget);
			//Bind a handler to the Cancel button
			var cancelButton = "#" + settings.headerId + " input[value=Cancel]";
			$(cancelButton).bind("click",function(){
				$.toggleStylesheet(false);
				return false;
			});
		} else {
			//Remove the added elemetns;
			var removeItems = "#" + settings.headerId;
			//var removeItems = removeItems + ",#logoLinkPrint";
			$(removeItems).remove();
		};
		//Swap the stylesheets
		$(settings.printStyleTarget).attr({
				disabled: !toggle
				});
		$(settings.normalStyleTarget).attr({
				disabled: toggle
				});
		}
	})(jQuery);

	//******** Print click handler - Dependancy:toggleStylesheet ********
	$("#pageTools li.print a").bind("click", function(){
		$.toggleStylesheet(true);
		return false;
	});

	//********** exit icon handling for IE6/IE7 ******
	if ($.browser.msie && $.browser.version.substr(0,1) < 8){
		$("a[href^='/exit/']").append('<img src="/templates/www/assets/exit_button.gif" alt="exit icon" style="padding:0px 0px 1px 3px; margin-bottom:-2px;">')};

	//********** exit link modals ******
	$("a[href^='/exit/']").addClass("exiter").click(function(){
		var url = $(this).attr("href") + " #modalContent";
		$.faaModal(true,{
					loadUrl: url,
					title: "You are about to leave FAA.gov",
					dialogClass: $(this).attr("class"),
					position: ["center",80],
					width: 600,
					height: 300,
					bgiframe: true
					});
		$("#modalDialog").dialog("open");
		return false;
	});

	//******** Subscribe click handler ********
	//$("#pageTools li.subscribe a").bind("click", function(){
		//console.log($(this));
	//	var regEx = /^.*(code=[^&]*)&(origin=[^&]*).*$/i;
	//	var code = $(this).attr("href").replace(regEx, "$1&$2");
	//	var url = "/demos/modal/subscribe.cfm?" + code + " div.formContents";
	//	$.faaModal(true, {
	//		title: 'Subscribe to FAA Page(s)',
	//		dialogClass: 'govDelivery',
	//		position: ['center',80],
	//		width: 600,
	//		height: 300,
	//		loadUrl: url
	//	});
	//	return false;
	//});

		//******** Email click handler *********
		$("li.email a").not("#widgetizer li.email a").bind("click", function() {
			var url = $(this).attr("href") + " form.layout";
			$.faaModal(true,{
					title: 'Email this Page',
					dialogClass: 'emailPage',
					position: ['center',80],
					width: 600,
					height: 400,
					loadUrl: url,
					loadCallback: function() {
								$("#emailPageForm").bind("submit", function(){
								//Set the variables from the form values.
								var toEmail = $.trim($("#toemail").val());
								var frEmail = $.trim($("#fromemail").val());
								var frmName = $.trim($("#name").val());
								var message = $.trim($("#message").val());
								var subject = $.trim($("#subject").val());
								var pageUrl = $.trim($("#pageurl").val());
								//Validate Email addresses
								var emailRegEx = /^[-\w.+'%]+@(?:[a-z\d-]+\.)+[a-z]{2,6}$/i;
								var isValidToEmail = toEmail.search(emailRegEx); //Returns -1 if invalid
								var isValidFrEmail = frEmail.search(emailRegEx); //Returns -1 if invalid
								//Validate non-Email fields
								var htmlRegEx = /((\%3C)|<)((\%2F)|\/)*[a-z0-9\%]+((\%3E)|>)/i; //Detects HTML in the values
								var uriRegEx = /^(?:https?:\/\/[a-z0-9\-]*\.faa\.gov)?\/[-a-z0-9+&@#\/%=~_|$?!:,.*]*[a-z0-9+&@#\/%=~_|$*]$/i;
								var isValidName = frmName.search(htmlRegEx); //Returns -1 if valid
								var isValidSubj = subject.search(htmlRegEx); //Returns -1 if valid
								var isValidMess = message.search(htmlRegEx); //Returns -1 if valid
								var isValidPage = pageUrl.search(uriRegEx); //Returns -1 if no match
								var errors = 0;
								//alert( "|" + isValidPage + "|");
								//Clear error statuses
								$("#emailPageForm input").removeClass("error");
								$("span.caption").remove();

									if (isValidToEmail < 0) {
										$("<span/>").addClass("caption bold").text("Please enter one (1) valid email address.").insertAfter("#toemail");
										$("#toemail").addClass("error");
										errors++;
										};
									if (isValidFrEmail < 0) {
										$("<span/>").addClass("caption bold").text("Please enter one (1) valid email address.").insertAfter("#fromemail");
										$("#fromemail").addClass("error");
										errors++;
										};
									if (isValidName >= 0) {
										$("<span/>").addClass("caption bold").text("Please do not use HTML tags in this field.").insertAfter("#name");
										$("#name").addClass("error");
										errors++;
										};
									if (isValidSubj >= 0) {
										$("<span/>").addClass("caption bold").text("Please do not use HTML tags in this field.").insertAfter("#subject");
										$("#subject").addClass("error");
										errors++;
										};
									if (isValidMess >= 0) {
										$("<span/>").addClass("caption bold").text("Please do not use HTML tags in this field.").insertAfter("#message");
										$("#message").addClass("error");
										errors++;
										};
									if (errors > 0) {
										return false;
									} else {
										var submitAction = 	"/email_page/submit.cfm .message-box";
										$("#modalDialog").load(submitAction, {
											'toemail': toEmail,
											'fromemail': frEmail,
											'name': frmName,
											'subject': subject,
											'message': message,
											'pageurl': pageUrl
										}, function(){
											$("#modalDialog li p a").bind("click", function(){
												$("#modalDialog").dialog("close");
												return false;
											});
										});
										return false;
									};
								});//End bind function
							}//End callback function in settings object
				}); //End $.faaModal() call
			//Additional styling targets applied
			$(".emailPage").attr("id","emailPage");
			$("#modalDialog").dialog("open");
			return false;
			});

	//******** Autocomplete ********
	var searchTerms = [
		"Form 337, Major Repair and Alteration",
		"Order 7110.65, Air Traffic Control",
		"Order 8100.8, Designee Management Handbook",
		"Order 8110.4, Type Certification",
		"Order 8130.21, Procedures for Completion and Use of the Authorized Release Certificate",
		"Form 8710-1, Airman Certificate and/or Rating Application",
		"Order 8900.1, Flight Standards Information Management System (FSIMS)",
		"Title 14, Code of Federal Regulations (14 CFR)",
		"Form 8050-1, Aircraft Registration Application",
		"Form 8130-3, Authorized Release Certificate",
		"Form 8130-6, Application for U.S. Airworthiness Certificate",
		"Form 8130-9, Statement of Conformity",
		"Form 8610-2, Airmen Certification and/or Rating Application",
		"Advisory Circulars (ACs)",
		"Airworthiness Directives (ADs)",
		"Air Defense Identification Zone (ADIZ)",
		"Automatic Dependent Surveillance Broadcast (ADS-B)",
		"Digital Airport/Facility Directory (d-AFD)",
		"Aeronautical Information Manual (AIM)",
		"air traffic controller",
		"Aircraft Registration",
		"Airplane Flying Handbook (FAA-H-8083-3A)",
		"airport diagrams",
		"Aerospace Medical Certification Subsystem (AMCS)",
		"Aviation Medical Examiner (AME)",
		"Aviation Safety Action Program (ASAP)",
		"Air Transportation Oversight System (ATOS)",
		"Form 8050-2, Aircraft Bill of Sale",
		"carry-on",
		"change of address",
		"charts",
		"Designated Airworthiness Representative (DAR)",
		"definitions",
		"Designated Engineering Representative (DER)",
		"directory",
		"Designated Mechanic Examiner (DME)",
		"Designated Pilot Examiner (DPE)",
		"Emergency Locator Transmitters (ELTs)",
		"email",
		"employees",
		"English Proficiency",
		"Federal Aviation Regulations (FARs)",
		"FAR 145, Repair Stations (Title 14 CFR Part 145)",
		"FAR 25, Airworthiness Standards: Transport Category Airplanes (Title 14 CFR Part 25)",
		"Form 7233-1, Flight Plan",
		"forms",
		"Flight Standards District Office (FSDO)",
		"handbook",
		"human factors",
		"Integrated Airman Certification and/or Rating Application (IACRA)",
		"Instrument Flying Handbook (FAA-H-8083-15)",
		"jobs",
		"liquids",
		"medical",
		"medications",
		"Master Minimum Equipment List (MMEL)",
		"N-Numbers",
		"NextGen",
		"Notices to Airmen (NOTAMs)",
		"Notices of Proposed Rulemaking (NPRM)",
		"New Employee Onboarding",
		"Airline Certification (Title 14 CFR Part 135)",
		"General Operating and Flight Rules (Title 14 CFR Part 91)",
		"Parts Manufacturer Approval (PMA)",
		"Airmen Practical Test Standards (PTS)",
		"registration",
		"repair stations",
		"Reduced Vertical Separation Minimum (RVSM)",
		"Special Airworthiness Information Bulletins (SAIB)",
		"service bulletins",
		"SFAR 88, Fuel Tank System Fault Tolerance Evaluation Requirements",
		"Safety Management Systems (SMS)",
		"sport pilot",
		"Supplemental Type Certificates (STC)",
		"Type Certificate Data Sheets (TCDS)",
		"Terminal Instrument Procedures (TERPS)",
		"Temporary Flight Restrictions (TFRs)",
		"Technical Standard Orders (TSO)",
		"type certificate",
		"Wide Area Augmentation System (WAAS)",
		"weather",
		"Pilot Proficiency Award Program (WINGS)",
		"Extended-range Twin-engine Operational Performance Standards (ETOPS)",
		"FAA-H-8083-25A, Pilot's Handbook of Aeronautical Knowledge",
		"FAA Safety Team (FAAST)",
		"Form 7460-1, Notice of Proposed Construction or Alteration",
		"Form 7460-2, Notice of Actual Construction or Alteration",
		"Form 8110-3, Statement of Compliance with the Federal Aviation Regulations",
		"Order 8130.2F, Airworthiness Certification of Aircraft and Related Products",
		"Form 8610-1, Mechanic's Application for Inspection Authorization",
		"Order 8900.2, General Aviation Airman Designee Handbook",
		"Airframe & Powerplant (A&P)",
		"FAR 43, Maintenance, Preventive Maintenance, Rebuilding, and Alteration (Title 14 CFR Part 43)",
		"Joint Planning and Development Office (JPDO)",
		"Local Area Augmentation System (LAAS)",
		"Mike Monroney Aeronautical Center (MMAC)",
		"National Airspace System (NAS)",
		"National Plan of Integrated Airport Systems (NPIAS)",
		"Operational Evolution Partnership (OEP)",
		"FAR 121, Air Carrier Certification Process (Title 14 CFR Part 121)",
		"FAR 61, Certification: Pilots, Flight Instructors, and Ground Instructors (Title 14 CFR Part 61)",
		"Regulatory and Guidance Library (RGL)",
		"Required Navigation Performance (RNP)",
		"Runway Safety",
		"Service Difficulty Reporting (SDR)",
		"Traffic Collision and Avoidance System (TCAS)",
		"Unmanned Aerial Vehicle (UAV)",
		"Suspected Unapproved Parts (SUP)",
		"acquisition",
		"administrator",
		"advisories",
		"air traffic control",
		"aircraft",
		"airframe",
		"airports",
		"airspace",
		"alcohol",
		"aviation weather",
		"avionics",
		"bird strike",
		"centerline",
		"clearances",
		"cockpit",
		"contractions",
		"designee",
		"dispatcher",
		"employee directory",
		"employee express",
		"employment",
		"familiarization",
		"flight attendant",
		"flight plan",
		"helicopter",
		"inspection authorization",
		"launch",
		"mechanics",
		"medical certificate",
		"medical examiners",
		"MedXpress",
		"modernization",
		"oversight",
		"parachute",
		"preflight",
		"publications",
		"rotorcraft",
		"scholarships",
		"takeoff",
		"training"];
	//Case insensitive sort
	//Sort the search terms
		var searchTerms = searchTerms.sort(function(x,y){
			 var a = String(x).toUpperCase();
			 var b = String(y).toUpperCase();
			 if (a > b)
				return 1
			 if (a < b)
				return -1
			 return 0;
		});
	//Template header search box autocomplete
	$("#q").autocomplete(searchTerms, {
			matchContains: true,
			selectFirst: false,
			cacheLength: 1,
			width: 375,
			highlight: function(value, term) {
				return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/i, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");
			}
		});
	//Template header search box autocomplete autosubmit
	$("#q").result(function(event){
		$("#google").submit();
		});
	//Search page search boxes autocomplete
	$("#googleQ01,#googleQ02").autocomplete(searchTerms, {
			matchContains: true,
			selectFirst: false,
			cacheLength: 1,
			width: 405,
			highlight: function(value, term) {
				return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/i, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");
			}
		});
	//Search page top search box autosubmit
	$("#googleQ01").result(function(event){
		$("#googleSearchInterface1").submit();
		});
	//Search page bottom search box autosubmit
	$("#googleQ02").result(function(event){
		$("#googleSearchInterface2").submit();
		});
//Modals for search links
	//N-NUMBER
		$("#nNumberSearch").attr("title","Open N-Number lookup box").bind("click", function(event) {
					var subset = " #ajaxContent";
					var title = "Look up an N-Number";
					var url = "/widgets/n-number/ajax/index.cfm" + subset;
					var position = ["center",100];
					var callback = function() {
						validateNnumberForm();
						};
					$.faaModal(true,{
						loadUrl: url,
						loadCallback: callback,
						title: title,
						dialogClass: $(this).attr("id"),
						position: position,
						width: 600,
						height: 200,
						modal: true,
						bgiframe: true
					});

					$("#modalDialog").dialog("open");
					return false;
			});
	//ORDERS & NOTICES
			$("#ordersNoticesSearch").attr("title","Open Orders & Notices search box").bind("click", function(event) {
				var searchType = "Orders & Notices";
				var subset = " #formSearchDirectives";
				var title = "Search " + searchType;
				var url = $(this).attr("href");
				var x = event.clientX;
				var y = event.clientY;
				if (x >= 700) {
					var position = [x-600,y-250];
				} else {
					var position = [x,y-250];
				};
				callback = function() {
					var defaultVal = 'Search Content, Number, Title, Description, or Office';
					//Bind Focus and Blur
					$("#formSearchDirectives #wfq").bind("focus", function(){
						var currentVal = $(this).val();
						$(this).removeClass("lightGrey");
							if(currentVal == defaultVal) {
							$(this).val("");
						};
					});
					$("#formSearchDirectives #wfq").bind("blur", function(){
						var currentVal = $(this).val();
						if(currentVal == "") {
							$(this).val(defaultVal);
							$(this).addClass("lightGrey");
						};
					});
					//Bind submission validation
					$("#formSearchDirectives").submit(function(event){
						if(! validateDocumentSearchForm()){
							return false;
						}
					});
					//Add explanatory text // Type some or all of a document title or number, select the appropriate Document Type and Status,<br /> and then click <strong>Search</strong>.<br /><br />
					$("<p/>").attr("id","ordNotText").html('Or, you can <a href="' + url + '#browseTopics" style="text-decoration: underline;">browse all ' + searchType + '</a>.').insertAfter($.trim(subset));
					//Add autocomplete
					$("#formSearchDirectives #wfq").autocomplete("/regulations_policies/orders_notices/index.cfm/go/document.documentJSString", {
						 matchContains: true,
						 selectFirst: false,
						 cacheLength: 1,
						 width: 495,
						 highlight: function(value, term) {
							return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/i, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");
						 }
					});

					$("#formSearchAdvisoryCirculars #wfq").result(function(event, data, formatted) {
						if (data){
							$("#documentNumber").val(data[1]);
						}
					});
				};
				$.faaModal(true,{
					loadUrl: url + subset,
					loadCallback: callback,
					title: title,
					dialogClass: $(this).attr("id"),
					position: position,
					width: 600,
					height: 250,
					bgiframe: true
				});

				$("#modalDialog").dialog("open");
				return false;
			});
	//ACs
		$("#advisoryCircularsSearch").attr("title","Open Advisory Circular search box").bind("click", function(event) {
				var searchType = "Advisory Circulars";
				var subset = " #formSearchAdvisoryCirculars";
				var title = "Search " + searchType;
				var url = $(this).attr("href");
				var x = event.clientX;
				var y = event.clientY;
				if (x >= 700) {
					var position = [x-600,y-200];
				} else {
					var position = [x,y-200];
				};
				callback = function() {
					var defaultVal = 'Search Content, Number, Title, Description, or Office';
					//Bind Focus and Blur
					$("#formSearchAdvisoryCirculars #wfq").bind("focus", function(){
						var currentVal = $(this).val();
						$(this).removeClass("lightGrey");
							if(currentVal == defaultVal) {
							$(this).val("");
						};
					});
					$("#formSearchAdvisoryCirculars #wfq").bind("blur", function(){
						var currentVal = $(this).val();
						if(currentVal == "") {
							$(this).val(defaultVal);
							$(this).addClass("lightGrey");
						};
					});
					//Bind submission validation
					$("#formSearchAdvisoryCirculars").submit(function(event){
						if(! validateDocumentSearchForm()){
							return false;
						}
					});
					//Add text
					$("<p/>").attr("id","acText").html('Or, you can <a href="' + url + '" style="text-decoration: underline;">browse all ' + searchType + '</a>.').insertAfter($.trim(subset));
					//Add autocomplete
					$("#formSearchAdvisoryCirculars #wfq").autocomplete("/regulations_policies/advisory_circulars/index.cfm/go/document.documentJSString", {
						 matchContains: true,
						 selectFirst: false,
						 cacheLength: 1,
						 width: 350,
						 highlight: function(value, term) {
							return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/i, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");
						 }
					});

					$("#formSearchAdvisoryCirculars #wfq").result(function(event, data, formatted) {
						if (data){
							$("#documentNumber").val(data[1]);
							if (data[0].indexOf('CANCELLED') > 0) {
								$("#display").val('all');
							};
						}
					});
				};
				$.faaModal(true,{
					loadUrl: url + subset,
					loadCallback: callback,
					title: title,
					dialogClass: $(this).attr("id"),
					position: position,
					width: 600,
					height: 200,
					bgiframe: true
				});

				$("#modalDialog").dialog("open");
				return false;
			});
//ADs
		$("#airworthyDirectiveSearch").attr("title","Open Airworthiness Directives search box").bind("click", function(event) {
				var searchType = "Airworthiness Directives";
				var subset = " #searchContainer";
				var title = "Search " + searchType;
				var url = $(this).attr("href");
				var x = event.clientX;
				var y = event.clientY;
				if (x >= 700) {
					var position = [x-600,y-200];
				} else {
					var position = [x,y-200];
				};
				callback = function() {
					var defaultVal = 'Type an AD Number, Title, Text, Make, or Model';
					//Bind Focus and Blur
					$("#formSearchADs #wfq").bind("focus", function(){
						var currentVal = $(this).val();
						$(this).removeClass("lightGrey");
							if(currentVal == defaultVal) {
							$(this).val("");
						};
					});
					$("#formSearchADs #wfq").bind("blur", function(){
						var currentVal = $(this).val();
						if(currentVal == "") {
							$(this).val(defaultVal);
							$(this).addClass("lightGrey");
						};
					});					
					//Add text
					$("<p/>").attr("id","acText").html('Or, you can <a href="' + url + '" style="text-decoration: underline;">browse all ' + searchType + '</a>.').insertAfter($.trim(subset));
					//Add autocomplete
					$("#formSearchADs #wfq").autocomplete("/regulations_policies/airworthiness_directives/index.cfm/go/app.autocompleteJSString ", {
						 matchContains: true,
						 selectFirst: false,
						 cacheLength: 1,
						 width: 450,
						 scrollHeight: 360,
						 max: 100,
						 highlight: function(value, term) {
							return value.replace(new RegExp("(?![^&;]+;)(?!<[^<>]*)(" + term.replace(/([\^\$\(\)\[\]\{\}\*\.\+\?\|\\])/i, "\\$1") + ")(?![^<>]*>)(?![^&;]+;)", "i"), "<strong>$1</strong>");
						 }
					});

					$("#formSearchADs #wfq").result(function(event, data, formatted) {
						if (data){					
							$("#criteriaObject").val(data[2]);
							$("#criteriaObjectID").val(data[3]);
							$("#wfq").val(data[1]);											
							if (data[2] == 'document'){ 
								$("#wfDisplay").val('all');						
							}																									
							$("#formSearchADs").submit();
						}
				    });
				};
				$.faaModal(true,{
					loadUrl: url + subset,
					loadCallback: callback,
					title: title,
					dialogClass: $(this).attr("id"),
					position: position,
					width: 600,
					height: 200,
					bgiframe: true
				});

				$("#modalDialog").dialog("open");
				return false;
			});		
//ready close
});