// JavaScript Document
$(document).ready(function(e) {
	
	//http://randomactsofcoding.blogspot.com/2008/10/starting-with-jquery-how-to-write.html
	//http://guillempascual.com/blog/jquery-validator-not-equal-to/
	jQuery.validator.addMethod("notEqualTo", function(value, element, param) {  
 
		var valid = true; 
		$(param).each(function(index, element){
			if(value == parseInt(element.value)){
				valid = false;
			}
		 });
		 
		 return valid;
	},
    "Each element should have a different value"
	);
 
// validate signup form on keyup and submit  
 
	var validator = $("#form1").validate({  
	 	errorPlacement: function(error, element) {
			
			error.appendTo("div#error1");
		},
			
	   rules: {
		
		"num1":{ 
		  required: true,
		  	notEqualTo: "#num2, #num3, #num4", 
		},  
	 
		"num2":{  
		  required: true,
		  	notEqualTo: "#num3,#num4", 
		},
	 
		"num3":{  
		   required: true,
			notEqualTo: "#num4",
		 },
	 
		"num4":{  
		  required: true,
			
		 } 
	   }
	   });
	
	//declare variables to be used globally
	var number, userGuesses;
	
	$('#winner').addClass('hidden');
	
	//starts new game
	$("#start").click(function(e) {
	
		number = '';
		$('#guesses').html('');
		$('#cows').html('');
		$('#bulls').html('');
		$('#winner').addClass('hidden');
		
		//generate a group of 4 numbers
		for(var i = 0; i < 4; i++){
			
			//generates a random number between 1 and 9
			//add 1 to skip 0
			var n = Math.floor((Math.random() *9) + 1);
			var nstr = n.toString();
			
			//if there is a duplicate number a new one will be generated
			while(i > 0 && number.indexOf(nstr) != -1){
				
				n = Math.floor((Math.random() *9) +1);	
				nstr = n.toString();	
			}
			//adds number to string after validation
			number += n.toString();	
		}
		console.log(number);
		
		//stores # of times strings were compared
		userGuesses = 0;
		//$('#results').html("Your guesses");
		$('#submit').removeClass('hidden');
		$('#start').addClass('hidden');
		$('input[type=number]').fadeIn(1500);
		$('input[type=number]').attr('readonly', false);
	});
		
	$("#form1").submit(function(e) {
		e.preventDefault();
		
		//grabs user numbers
		var userNumber = $('#num1').val();
		userNumber += $('#num2').val();
		userNumber += $('#num3').val();
		userNumber += $('#num4').val();
		
		//sets cows and bulls
		var userCows = 0;
		var userBulls = 0;
		
		//console.log(userNumber);
		
		//loops through user number comparing to number
		for(var i = 0; i < userNumber.length; i++){
			var n = userNumber.charAt(i);
			if(n === number.charAt(i)){
				userBulls ++;	
			}else if(number.indexOf(n) > -1){
				userCows ++;
			}
		}
		
		//tylers validation hack
		$('input').focus().blur();
		
		if( $(this).valid() ){
			//prints user guesses and no of cows and bulls	
			$('#guesses').prepend('<p>' + userNumber  + '</p>');
			//$('#guesses p:nth-of-type(1)').animate({fontSize: "150%"});
			//$('#guesses p:first-child').animate({fontSize: "1em"});
			//get images for cows
			var cows = " ";
			//if no cows, print p anyways
			if(userCows != 0){
				for(var c = 0; c < userCows;c++){
					
					cows += '<img src="images/cow.gif">';
				}
			}else{
				cows+='&nbsp;';	
			}
			
			$('#cows').prepend('<p>' + cows + '</p>');
			$('#cows p:nth-of-type(1)').animate({width: "110%", height: "110%"});
			//console.log(userCows);
			
			//get images for bulls
			var bulls = " ";
			
			//if no bulls, print p anyways
			if(userBulls != 0){
				for(var b = 0; b < userBulls;b++){
					
					bulls += '<img src="images/bull.gif">';
				}
			}else{
				bulls+='&nbsp;';	
			}
			
			$('#bulls').prepend('<p>' + bulls + '</p>');
			$('#bulls p:nth-of-type(1)').animate({width: "110%", height: "110%"});
			//console.log(userBulls);
			userGuesses ++;
		
			//checks if there is a winner
			if(userBulls == 4){
				$('#winner').removeClass('hidden');
				$('#submit').addClass('hidden');
				$('input[type=number]').attr('readonly', true);
				$('#start').removeClass('hidden');
				$('#winner').html('<h3><span id="win">Winner!</span><br> It took ' + userGuesses + ' guesses.</h3>');
				$('#win').animate({fontSize: "3em"});
				$('#win').animate({fontSize: "2.5em"});
			}
		}

	
		
	});// end form submit
	
	
});//end of document